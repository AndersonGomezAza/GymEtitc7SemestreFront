import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormPlanesComponent } from '../forms/form-planes/form-planes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['descripcionPlan', 'duracionMesesPlan', 'precioFormateado', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnHeaders = {
    descripcionPlan: 'Descripcion',
    duracionMesesPlan: 'Duracion Meses',
    precioFormateado: 'Precio',
    acciones: 'Acciones',
  };

  constructor(public apiService: ApiService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource()
  }


  ngOnInit(): void {
    this.apiService.Get('Planes').then(res=>{
      this.dataSource.data = res.map(item => {
        item.precioFormateado = this.formatoPrecioColombiano(item.valorPlan);
        return item;
      })
    })
  }

  formatoPrecioColombiano(precio: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(precio);
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
    this.dialog.open(FormPlanesComponent, {
      width: '60%',
    });
  }

  removePlan(plan) {
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
        this.apiService.delete('Planes', plan.idPlan).then(res=>{this.ngOnInit()});
        Swal.fire(
          'Registro Eliminado',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })
  }
}
