import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/modal/modal.service';
import { actividadesModel } from 'src/app/models/actividadesModel';


@Component({
  selector: 'app-form-actividades',
  templateUrl: './form-actividades.component.html',
  styleUrls: ['./form-actividades.component.css']
})

export class FormActividadesComponent implements OnInit{
  private fb = inject(FormBuilder);

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.activitiesForm.setValue({
        Descripcion: data.descripcionActividad,
        Duracion: data.duracionMinActividad,
        Categoria: data.categoriaActividad,
      });
      console.log(data)
      this.idData = data.idActividad;
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }


  activitiesForm = this.fb.group({
    Descripcion: [null, [Validators.required]],
    Duracion: [null, [Validators.required, Validators.max(60)]],
    Categoria: [null, [Validators.required, Validators.maxLength(20)]]
  });

  infoActividades: actividadesModel = {
    DescripcionActividad: "",
    DuracionMinActividad: 0,
    CategoriaActividad: "",
  };

  titulo = ""
  acciones = ""
  idData = "";

  ngOnInit(): void {

    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value
  }
  onSubmit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value

    if (this.activitiesForm.valid) {
      this.infoActividades.DescripcionActividad = this.activitiesForm.controls['Descripcion'].value;
      this.infoActividades.DuracionMinActividad = this.activitiesForm.controls['Duracion'].value;
      this.infoActividades.CategoriaActividad = this.activitiesForm.controls['Categoria'].value;

      this.dialog.closeAll();

      if (this.acciones == "Editar") {

        var editActividades = {
          DescripcionActividad: this.infoActividades.DescripcionActividad,
          DuracionMinActividad: this.infoActividades.DuracionMinActividad,
          CategoriaActividad: this.infoActividades.CategoriaActividad,
          IdActividad: this.idData,
        }

        this.apiService.update('Actividades', editActividades, this.idData).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'La actividad ha sido actualizadang ',
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
        this.apiService.post('Actividades', this.infoActividades).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'La actividad ha sido creada',
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
      }
    } else {
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}


