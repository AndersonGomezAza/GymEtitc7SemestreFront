import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormValoracionesComponent } from '../forms/form-valoraciones/form-valoraciones.component';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit{

  displayedColumns: string[] = ['FechaValoracion', 'CategoriaValoracion', 'DescricpcinValoracion', 'RecomendacionValoracion', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    idValoracion:'Id Valoracion',
    FechaValoracion: 'Fecha de Valoración',
    CategoriaValoracion: 'Categoria',
    DescricpcinValoracion: 'Descripción',
    RecomendacionValoracion: 'Nombres Cliente',
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    this.dialog.open(FormValoracionesComponent, {
      width: '60%',
    });
  }
  removeValoracion(valoracion) {
    this.apiService.delete('Valoracion', valoracion.idValoracion).then(res=>{this.ngOnInit()});
  }
}
