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
import { ModalService } from 'src/app/modal/modal.service';

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

  accion: string = "Crear";

  constructor(public apiService: ApiService, public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get('Actividades').then(res=>{
      return this.dataSource.data = res;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.modalService.acciones.next(this.accion);
    this.dialog.open(FormActividadesComponent, {
      width: '60%',
    });
  }

  editarActividad(element: any) {
    this.modalService.acciones.next("Editar");

    this.dialog.open(FormActividadesComponent, {
      height: 'auto',
      width: 'auto',
      data: element // El objeto 'element' ahora contiene los datos del dueño a editar
    });
  }

  removeActividad(actividad) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la actividad. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Actividades', actividad.id).then((res) => {
          this.ngOnInit();
          Swal.fire('Actividad Eliminada', 'La actividad ha sido eliminada.', 'success');
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
