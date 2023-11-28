import { Component, Inject, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RutinasModels } from 'src/app/Models/RutinasModels';
import { ModalService } from 'src/app/modal/modal.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-rutinas',
  templateUrl: './form-rutinas.component.html',
  styleUrls: ['./form-rutinas.component.css']
})
export class FormRutinasComponent implements OnInit{
  private fb = inject(FormBuilder);

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    public modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.rutinasForm.setValue({
        Calorias: data.caloriasRutina,
        Descripcion: data.descripcionRutina,
        Nombre: data.nombreRutina,
        Categoria: data.categoriaRutina,
        Tiempo: data.tiempoRutinaMin,
      });
      console.log(data)
      this.idData = data.idRutina;
      this.titulo = this.modalService.titulo;
      this.acciones = this.modalService.acciones.value;
    }
  }

  rutinasForm = this.fb.group({
    Calorias: [null, [Validators.required, Validators.max(600)]],
    Descripcion: [null, [Validators.required, Validators.maxLength(50)]],
    Nombre: [null, [Validators.required, Validators.maxLength(40)]],
    Categoria: [null, [Validators.required, Validators.maxLength(500)]],
    Tiempo: [null, [Validators.required, Validators.max(40)]]
  });

  infoRutinas: RutinasModels = {
    CaloriasRutina: 0,
    DescripcionRutina:"",
    NombreRutina:"",
    CategoriaRutina:"",
    TiempoRutinaMin: 0,
  };

  ngOnInit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value
  }

  titulo = ""
  acciones = ""
  idData = "";

  onSubmit(): void {
    this.titulo = this.modalService.titulo
    this.acciones = this.modalService.acciones.value

    if (this.rutinasForm.valid) {
      this.infoRutinas.CaloriasRutina = this.rutinasForm.controls['Calorias'].value;
      this.infoRutinas.DescripcionRutina = this.rutinasForm.controls['Descripcion'].value;
      this.infoRutinas.NombreRutina = this.rutinasForm.controls['Nombre'].value;
      this.infoRutinas.CategoriaRutina = this.rutinasForm.controls['Categoria'].value;
      this.infoRutinas.TiempoRutinaMin = this.rutinasForm.controls['Tiempo'].value;

      this.dialog.closeAll();

      if (this.acciones == "Editar") {

        var editPlan = {
          CaloriasRutina: this.infoRutinas.CaloriasRutina,
          DescripcionRutina: this.infoRutinas.DescripcionRutina,
          NombreRutina: this.infoRutinas.NombreRutina,
          CategoriaRutina: this.infoRutinas.CategoriaRutina,
          TiempoRutinaMin: this.infoRutinas.TiempoRutinaMin,
          IdRutina: this.idData,
        }

        this.apiService.update('Rutinas', editPlan, this.idData).then(res => {
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
        this.apiService.post('Rutinas', this.infoRutinas).then(res=>{
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'La rutina ha sido creada',
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
