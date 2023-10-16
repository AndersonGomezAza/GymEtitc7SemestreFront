import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { planesModel } from 'src/app/models/planesModel';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-planes',
  templateUrl: './form-planes.component.html',
  styleUrls: ['./form-planes.component.css']
})
export class FormPlanesComponent {
  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

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

  onSubmit(): void {
    if (this.planesForm.valid) {
      this.infoPlanes.DescripcionPlan = this.planesForm.controls['Descripcion'].value;
      this.infoPlanes.DuracionMesesPlan = this.planesForm.controls['Duracion'].value;
      this.infoPlanes.ValorPlan = this.planesForm.controls['Precio'].value;

      this.dialog.closeAll();
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
    }else{
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
