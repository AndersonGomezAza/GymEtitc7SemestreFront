import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormMaquinariasComponent } from '../forms/form-maquinarias/form-maquinarias.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maquinarias',
  templateUrl: './maquinarias.component.html',
  styleUrls: ['./maquinarias.component.css']
})
export class MaquinariasComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [ 'nombreMaquinaria', 'descripcionMaquinaria', 'categoriaMaquinaria', 'estadoMaquinaria', 'serialMaquinaria', 'acciones'];
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

  constructor(public apiService: ApiService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get("Maquinarias").then((res)=>{
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Elementos por pagina";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(FormMaquinariasComponent, {
      width: '60%',
    });
  }

  removeMaquinaria(maquinaria) {
    Swal.fire({
      title: 'Esta Seguro que desea eliminar el registro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Maquinarias', maquinaria.idMaquinaria).then(res=>{this.ngOnInit()});
        Swal.fire(
          'Registro Eliminado',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })
  }
}
