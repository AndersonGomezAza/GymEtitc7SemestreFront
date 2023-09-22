import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-maquinarias',
  templateUrl: './maquinarias.component.html',
  styleUrls: ['./maquinarias.component.css']
})
export class MaquinariasComponent implements OnInit{
  displayedColumns: string[] = ['idMaquinaria', 'nombreMaquinaria', 'descripcionMaquinaria', 'categoriaMaquinaria', 'estadoMaquinaria', 'serialMaquinaria'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    idMaquinaria: 'Id Actividad',
    nombreMaquinaria: 'Nombre',
    descripcionMaquinaria: 'Descripcion',
    categoriaMaquinaria: 'Categoria',
    estadoMaquinaria: 'Estado',
    serialMaquinaria: 'Serial',
  };

  constructor(public apiService: ApiService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.apiService.Get("Maquinarias").then((res)=>{
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
}
