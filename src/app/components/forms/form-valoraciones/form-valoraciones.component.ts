import { Component, inject } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { valoracionesModels } from 'src/app/Models/valoracionesModel';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-valoraciones',
  templateUrl: './form-valoraciones.component.html',
  styleUrls: ['./form-valoraciones.component.css']
})
export class FormValoracionesComponent {
  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  valoracionesForm = this.fb.group({
    FechaValoracion: [new Date(), [Validators.required]],
    CategoriaValoracion: [null, [Validators.required, Validators.maxLength(20)]],
    DescricpcinValoracion: [null, [Validators.required, Validators.maxLength(30)]], 
    RecomendacionValoracion:  [null, [Validators.required, Validators.maxLength(30)]],
    NumDocumento:  [null, [Validators.required, Validators.maxLength(30)]],
  });

  infoValoraciones: valoracionesModels = {
    FechaValoracion: new Date(),
    CategoriaValoracion:"",
    DescricpcinValoracion:"",
    RecomendacionValoracion:"",
    NumDocumento: 0,
  };

  onSubmit(): void {
    if (this.valoracionesForm.valid) {
      this.infoValoraciones.FechaValoracion = this.valoracionesForm.controls['Fecha'].value;
      this.infoValoraciones.CategoriaValoracion = this.valoracionesForm.controls['Categoria'].value;
      this.infoValoraciones.DescricpcinValoracion = this.valoracionesForm.controls['Descripcion'].value;
      this.infoValoraciones.RecomendacionValoracion = this.valoracionesForm.controls['Recomendacion'].value;
      this.infoValoraciones.NumDocumento = this.valoracionesForm.controls['Numero de Documento'].value;

      this.dialog.closeAll();
      this.apiService.post('Maquinarias', this.infoValoraciones).then(res=>{
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
    }else{
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}