import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { implementosModel } from 'src/app/models/implementosModel';
import Swal from 'sweetalert2';
import { ApiService } from '../../../services/api.service';
import { ModalService } from 'src/app/modal/modal.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-form-implementos',
  templateUrl: './form-implementos.component.html',
  styleUrls: ['./form-implementos.component.css']
})
export class FormImplementosComponent implements OnInit{
  private fb = inject(FormBuilder);
  implementsForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.max(60)]],
    Categoria:   [null, [Validators.required, Validators.maxLength(20)]],
    Serial:   [null, [Validators.required, Validators.maxLength(20)]],
  });
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    public apiService:ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any // Utiliza MAT_DIALOG_DATA para obtener los datos
  ) {
    this.dataSource = new MatTableDataSource();

    if (data) {
      this.implementsForm.setValue({
        Nombre: data.nombreImplemento,
        Descripcion: data.descripcionImplemento,
        Categoria: data.categoriaImplemento,
        Serial: data.serialImplemento,
      });
      this.idData = data.idImplemento
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }

  infoImplementos: implementosModel = {
    NombreImplemento:"",
    CategoriaImplemento:"",
    DescripcionImplemento:"",
    SerialImplemento:"",
  };

  titulo=""
  acciones=""
  idData = ""

  ngOnInit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value
  }

  onSubmit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value

    if (this.implementsForm.valid) {
      this.infoImplementos.NombreImplemento = this.implementsForm.controls['Nombre'].value;
      this.infoImplementos.CategoriaImplemento = this.implementsForm.controls['Descripcion'].value;
      this.infoImplementos.DescripcionImplemento = this.implementsForm.controls['Categoria'].value;
      this.infoImplementos.SerialImplemento = this.implementsForm.controls['Serial'].value;

      this.dialog.closeAll();
      if (this.acciones == "Editar") {

        var editImplemento = {
          nombreImplemento: this.infoImplementos.NombreImplemento,
          categoriaImplemento: this.infoImplementos.CategoriaImplemento,
          descripcionImplemento: this.infoImplementos.DescripcionImplemento,
          serialImplemento: this.infoImplementos.SerialImplemento,
          idImplemento: this.idData,
        }

        this.apiService.update('Implementos', editImplemento, this.idData).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El implemento ha sido actualizado ',
              icon: 'success',
              color: '#716add',
            })
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          )
        })
      } else if (this.acciones == "Crear") {
        this.apiService.post('Implementos', this.infoImplementos).then(res=>{
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El implemento ha sido creada',
              icon: 'success',
              color: '#716add',
            })
          }
        }).catch(error=>{
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          )
        })
      }
    }else{
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
