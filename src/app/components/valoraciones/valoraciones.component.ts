import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormValoracionesComponent } from '../forms/form-valoraciones/form-valoraciones.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit{

  displayedColumns: string[] = ['fechaValoracion', 'categoriaValoracion', 'descripcionValoracion', 'nombres', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    idValoracion:'Id Valoracion',
    fechaValoracion: 'Fecha de Valoración',
    categoriaValoracion: 'Categoria',
    descripcionValoracion: 'Descripción',
    nombres: 'Nombres Cliente',
    acciones: 'Acciones',
  };

  constructor(public apiService: ApiService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get("Valoraciones").then((res)=>{
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
    this.dialog.open(FormValoracionesComponent, {
      width: '60%',
    });
  }

  removeValoracion(valoracion) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la valoración. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Valoraciones', valoracion.idValoracion).then((res) => {
          this.ngOnInit();
          Swal.fire('Valoración Eliminada', 'La valoración ha sido eliminada.', 'success');
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
