import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormMaquinariasComponent } from '../forms/form-maquinarias/form-maquinarias.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: 'app-maquinarias',
  templateUrl: './maquinarias.component.html',
  styleUrls: ['./maquinarias.component.css']
})
export class MaquinariasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombreMaquinaria', 'descripcionMaquinaria', 'categoriaMaquinaria', 'estadoMaquinaria', 'serialMaquinaria', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    nombreMaquinaria: 'Nombre',
    descripcionMaquinaria: 'Descripcion',
    categoriaMaquinaria: 'Categoria',
    estadoMaquinaria: 'Estado',
    serialMaquinaria: 'Serial',
    acciones: 'Acciones',
  };

  
  accion: string = "Crear Maquinaria";

  constructor(public apiService: ApiService, public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get("Maquinarias").then((res) => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTable(data: any[]) {
    this.displayedColumns = [];
    for (let column in data[0]) {
      this.displayedColumns.push(column);
    }
    this.displayedColumns.push('acciones');

  }

  openDialog() {
    this.dialog.open(FormMaquinariasComponent, {
      width: '60%',
    });
  }

  
  editarMaquinaria(element: any) {
    this.modalService.acciones.next("Editar Maquinaria");
    this.accion = "Editar Maquinaria";
  
    this.dialog.open(FormMaquinariasComponent, {
      height: 'auto',
      width: 'auto',
      data: element // El objeto 'element' ahora contiene los datos del dueño a editar
    });
  }

  removeMaquinaria(maquinaria) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la maquinaria. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Maquinarias', maquinaria.id).then((res) => {
          this.ngOnInit();
          Swal.fire('Maquinaria Eliminada', 'La maquinaria ha sido eliminada.', 'success');
        });
      }
    });
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
