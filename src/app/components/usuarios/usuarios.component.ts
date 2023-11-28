import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

import { MatDialog } from '@angular/material/dialog';
import { FormUsuariosComponent } from '../forms/form-usuarios/form-usuarios.component';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['numDocumento', 'nombres', 'apellidos', 'descripcionPlan', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    numDocumento:'Numero Documento',
    nombres: 'Nombre',
    apellidos: 'Apellido',
    descripcionPlan: 'Descripcion Plan',
    acciones: 'Acciones',
  };

  accion: string = "Crear";

  constructor(public apiService: ApiService, public dialog:MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get("Usuarios").then((res)=>{
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

    this.modalService.acciones.next(this.accion);
    this.dialog.open(FormUsuariosComponent, {
      width: '60%',
    });
  }

  editarUsuario(element: any) {
    this.modalService.acciones.next("Editar");

    this.dialog.open(FormUsuariosComponent, {
      height: 'auto',
      width: 'auto',
      data: element // El objeto 'element' ahora contiene los datos del dueño a editar
    });
  }

  removeUsuario(usuario) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Usuarios', usuario.idUsuario).then((res) => {
          this.ngOnInit();
          Swal.fire('Usuario Eliminado', 'El usuario ha sido eliminado.', 'success');
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
