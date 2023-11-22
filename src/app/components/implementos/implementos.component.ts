import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormImplementosComponent } from '../forms/form-implementos/form-implementos.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: 'app-implementos',
  templateUrl: './implementos.component.html',
  styleUrls: ['./implementos.component.css']
})
export class ImplementosComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['nombreImplemento', 'descripcionImplemento', 'categoriaImplemento', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {

    nombreImplemento: 'Nombre',
    descripcionImplemento: 'Descripcion',
    categoriaImplemento: 'Categoria',
    acciones: 'Acciones',
  };

  accion: string = "Crear Implemento";

  constructor(public apiService: ApiService, public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get("Implementos").then((res)=>{
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
    this.dialog.open(FormImplementosComponent, {
      width: '60%',
    });
  }

  editarImplemento(element: any) {
    this.modalService.acciones.next("Editar Implemento");
    this.accion = "Editar Implemento";

    this.dialog.open(FormImplementosComponent, {
      height: 'auto',
      width: 'auto',
      data: element // El objeto 'element' ahora contiene los datos del dueño a editar
    });
  }

  removeImplemento(implemento) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el implemento. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Implementos', implemento.idImplemento).then((res) => {
          this.ngOnInit();
          Swal.fire('Implemento Eliminado', 'El implemento ha sido eliminado.', 'success');
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


