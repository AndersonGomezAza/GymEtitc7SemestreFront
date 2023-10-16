import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormRutinasComponent } from '../forms/form-rutinas/form-rutinas.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['NombreRutina', 'CaloriasRutina', 'DescripcionRutina', 'CategoriaRutina', 'TiempoRutinaMin', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    NombreRutina: 'Nombre',
    CaloriasRutina: 'Calorias',
    DescripcionRutina: 'Descripcion',
    CategoriaRutina: 'Categoria',
    TiempoRutinaMin: 'Tiempo',
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(FormRutinasComponent, {
      width: '60%',
    });
  }

  removeRutina(rutina) {
    this.apiService.delete('Rutinas', rutina.idRutina).then(res=>{this.ngOnInit()});
  }
}

