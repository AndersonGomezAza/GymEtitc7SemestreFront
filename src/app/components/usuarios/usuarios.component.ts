import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

import { MatDialog } from '@angular/material/dialog';
import { FormUsuariosComponent } from '../forms/form-usuarios/form-usuarios.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['tipoDoc', 'numDocumento', 'nombres', 'apellidos', 'descripcionPlan', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    tipoDoc: 'Tipo Documento',
    numDocumento:'Numero Documento',
    nombres: 'Nombre',
    apellidos: 'Apellido',
    descripcionPlan: 'Descripcion Plan',
    acciones: 'Acciones',
  };

  constructor(public apiService: ApiService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get("Usuarios").then((res)=>{
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
    this.dialog.open(FormUsuariosComponent, {
      width: '60%',
    });
  }

  removeUsuario(usuario) {
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
        this.apiService.delete('Usuarios', usuario.idUsuario).then(res=>{this.ngOnInit()});
        Swal.fire(
          'Registro Eliminado',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })
  }
}

