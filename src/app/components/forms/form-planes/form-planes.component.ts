import { Component, Inject, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/modal/modal.service';
import { planesModel } from 'src/app/models/planesModel';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-planes',
  templateUrl: './form-planes.component.html',
  styleUrls: ['./form-planes.component.css']
})
export class FormPlanesComponent implements OnInit{
  private fb = inject(FormBuilder);

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.planesForm.setValue({
        Descripcion: data.descripcionPlan,
        Duracion: data.duracionMesesPlan,
        Precio: data.valorPlan,
      });
      console.log(data)
      this.idData = data.idPlan;
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }

  titulo = ""
  acciones = ""
  idData = "";

  planesForm = this.fb.group({
    Descripcion: [null, [Validators.required, Validators.maxLength(30)]],
    Duracion: [null, [Validators.required, Validators.max(12)]],
    Precio: [null, [Validators.required, Validators.pattern('^[0-9]+[^.]')]]
  });

  infoPlanes: planesModel = {
    DescripcionPlan:"",
    DuracionMesesPlan:0,
    ValorPlan:0,
  };

  ngOnInit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value
  }

  onSubmit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value

    if (this.planesForm.valid) {
      this.infoPlanes.DescripcionPlan = this.planesForm.controls['Descripcion'].value;
      this.infoPlanes.DuracionMesesPlan = this.planesForm.controls['Duracion'].value;
      this.infoPlanes.ValorPlan = this.planesForm.controls['Precio'].value;

      this.dialog.closeAll();
      if (this.acciones == "Editar") {

        var editPlan = {
          DescripcionPlan: this.infoPlanes.DescripcionPlan,
          DuracionMesesPlan: this.infoPlanes.DuracionMesesPlan,
          ValorPlan: this.infoPlanes.ValorPlan,
          IdPlan: this.idData,
        }

        this.apiService.update('Planes', editPlan, this.idData).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'La actividad ha sido actualizada ',
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
        this.apiService.post('Planes', this.infoPlanes).then(res=>{
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El plan ha sido creada',
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
