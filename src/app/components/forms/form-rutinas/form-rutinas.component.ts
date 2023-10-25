import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RutinasModel } from 'src/app/models/RutinasModel';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-rutinas',
  templateUrl: './form-rutinas.component.html',
  styleUrls: ['./form-rutinas.component.css']
})
export class FormRutinasComponent {
  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  rutinasForm = this.fb.group({
    Calorias: [null, [Validators.required, Validators.max(500)]],
    Descripcion: [null, [Validators.required]],
    Nombre: [null, [Validators.required, Validators.maxLength(40)]],
    Categoria: [null, [Validators.required, Validators.maxLength(500)]],
    Tiempo: [null, [Validators.required, Validators.max(60)]]
  });

  infoRutinas: RutinasModel = {
    CaloriasRutina: 0,
    DescripcionRutina:"",
    NombreRutina:"",
    CategoriaRutina:"",
    TiempoRutinaMin: 0,
  };


  onSubmit(): void {
    if (this.rutinasForm.valid) {
      this.infoRutinas.CaloriasRutina = this.rutinasForm.controls['Calorias'].value;
      this.infoRutinas.DescripcionRutina = this.rutinasForm.controls['Descripcion'].value;
      this.infoRutinas.NombreRutina = this.rutinasForm.controls['Nombre'].value;
      this.infoRutinas.CategoriaRutina = this.rutinasForm.controls['Categoria'].value;
      this.infoRutinas.TiempoRutinaMin = this.rutinasForm.controls['Tiempo'].value;

      this.dialog.closeAll();
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
    }else{
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
