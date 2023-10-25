import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormActividadesComponent } from '../forms/form-actividades/form-actividades.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatInputModule],
})
export class ActividadesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['descripcionActividad', 'duracionMinActividad', 'categoriaActividad', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    descripcionActividad: 'Descripcion',
    duracionMinActividad: 'Duracion Minutos',
    categoriaActividad: 'Categoria',
    acciones: 'Acciones',
  };

  constructor(public apiService: ApiService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get('Actividades').then(res=>{
      return this.dataSource.data = res;
    })
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
    this.dialog.open(FormActividadesComponent, {
      width: '60%',
    });
  }

  getActivities(){
    this.ngOnInit();
  }

  removeActivity(actividad) {
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
        this.apiService.delete('Actividades', actividad.idActividad).then(res=>{this.ngOnInit()});
        Swal.fire(
          'Registro Eliminado',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })
  }
}
