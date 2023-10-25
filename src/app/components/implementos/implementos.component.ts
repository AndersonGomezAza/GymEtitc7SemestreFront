import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormImplementosComponent } from '../forms/form-implementos/form-implementos.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-implementos',
  templateUrl: './implementos.component.html',
  styleUrls: ['./implementos.component.css']
})
export class ImplementosComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['nombreImplemento', 'descripcionImplemento', 'categoriaImplemento', 'serialImplemento', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    nombreImplemento: 'Nombre',
    descripcionImplemento: 'Descripcion',
    categoriaImplemento: 'Categoria',
    serialImplemento: 'Serial',
    acciones: 'Acciones',
  };

  constructor(public apiService: ApiService, public dialog: MatDialog) {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(FormImplementosComponent, {
      width: '60%',
    });
  }

  removeImplement(implement) {
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
        this.apiService.delete('Implementos', implement.idImplemento).then(res=>{this.ngOnInit})
        Swal.fire(
          'Registro Eliminado',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })
  }
}
