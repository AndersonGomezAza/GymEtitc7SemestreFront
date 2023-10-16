import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { maquinariasModel } from 'src/app/models/maquinariasModel';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-maquinarias',
  templateUrl: './form-maquinarias.component.html',
  styleUrls: ['./form-maquinarias.component.css']
})
export class FormMaquinariasComponent {
  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  machineryForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.max(60)]],
    Categoria: [null, [Validators.required, Validators.maxLength(20)]],
    Estado: [null, [Validators.required, Validators.max(20)]],
    Serial: [null, [Validators.required, Validators.maxLength(20)]]
  });

  infoMaquinarias: maquinariasModel = {
    NombreMaquinaria:"",
    CategoriaMaquinaria:"",
    DescripcionMaquinaria:"",
    SerialMaquinaria:"",
    EstadoMaquinaria:"",
  };

  onSubmit(): void {
    if (this.machineryForm.valid) {
      this.infoMaquinarias.NombreMaquinaria = this.machineryForm.controls['Nombre'].value;
      this.infoMaquinarias.CategoriaMaquinaria = this.machineryForm.controls['Descripcion'].value;
      this.infoMaquinarias.DescripcionMaquinaria = this.machineryForm.controls['Categoria'].value;
      this.infoMaquinarias.EstadoMaquinaria = this.machineryForm.controls['Categoria'].value;
      this.infoMaquinarias.SerialMaquinaria = this.machineryForm.controls['Serial'].value;

      this.dialog.closeAll();
      this.apiService.post('Maquinarias', this.infoMaquinarias).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'La maquinaria ha sido creada',
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
