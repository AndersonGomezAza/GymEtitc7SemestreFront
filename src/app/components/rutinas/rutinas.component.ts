import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormRutinasComponent } from '../forms/form-rutinas/form-rutinas.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombreRutina', 'caloriasRutina', 'descripcionRutina', 'categoriaRutina', 'tiempoRutinaMin', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    nombreRutina: 'Nombre',
    caloriasRutina: 'Calorias',
    descripcionRutina: 'Descripcion',
    categoriaRutina: 'Categoria',
    tiempoRutinaMin: 'Tiempo',
    acciones: 'Acciones',
  };


  constructor(public apiService: ApiService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get("Rutinas").then((res)=>{
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
    this.dialog.open(FormRutinasComponent, {
      width: '60%',
    });
  }

  removeRutina(rutina) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la rutina. No podrás deshacerla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('Rutinas', rutina.idRutina).then((res) => {
          this.ngOnInit();
          Swal.fire('Rutina Eliminada', 'La rutina ha sido eliminada.', 'success');
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
