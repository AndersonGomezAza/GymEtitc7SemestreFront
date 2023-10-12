import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { implementosModel } from 'src/app/models/implementosModel';
import Swal from 'sweetalert2';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-form-implementos',
  templateUrl: './form-implementos.component.html',
  styleUrls: ['./form-implementos.component.css']
})
export class FormImplementosComponent {
  private fb = inject(FormBuilder);
  implementsForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.max(60)]],
    Categoria: [null, [Validators.required, Validators.maxLength(20)]],
    Serial: [null, [Validators.required, Validators.maxLength(20)]]
  });

  constructor( public dialog: MatDialog, public apiService:ApiService){}

  infoImplemetos: implementosModel = {
    NombreImplemento:"",
    CategoriaImplemento:"",
    DescripcionImplemento:"",
    SerialImplemento:"",
  };

  onSubmit(): void {
    if (this.implementsForm.valid) {
      this.infoImplemetos.NombreImplemento = this.implementsForm.controls['Nombre'].value;
      this.infoImplemetos.CategoriaImplemento = this.implementsForm.controls['Descripcion'].value;
      this.infoImplemetos.DescripcionImplemento = this.implementsForm.controls['Categoria'].value;
      this.infoImplemetos.SerialImplemento = this.implementsForm.controls['Serial'].value;

      this.dialog.closeAll();
      this.apiService.post('Implementos', this.infoImplemetos).then(res=>{
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
    }else{
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
