import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { actividadesModel } from 'src/app/models/actividadesModel';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ActividadesComponent } from '../../actividades/actividades.component';


@Component({
  selector: 'app-form-actividades',
  templateUrl: './form-actividades.component.html',
  styleUrls: ['./form-actividades.component.css']
})
export class FormActividadesComponent {
  private fb = inject(FormBuilder);
  activitiesForm = this.fb.group({
    Descripcion: [null, [Validators.required]],
    Duracion: [null, [Validators.required, Validators.max(60)]],
    Categoria: [null, [Validators.required, Validators.maxLength(20)]]
  });

  constructor(public dialog: MatDialog, public apiService: ApiService){}

  infoActividades: actividadesModel ={
    DescripcionActividad: "",
    DuracionMinActividad: 0,
    CategoriaActividad: "",
  }

  onSubmit(): void {
    if (this.activitiesForm.valid) {
      this.infoActividades.DescripcionActividad = this.activitiesForm.controls['Descripcion'].value;
      this.infoActividades.DuracionMinActividad = this.activitiesForm.controls['Duracion'].value;
      this.infoActividades.CategoriaActividad = this.activitiesForm.controls['Categoria'].value;

      this.dialog.closeAll();
      this.apiService.post('Actividades', this.infoActividades).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'La actividad ha sido creada',
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
