import { Component, inject, OnInit } from '@angular/core';


import { FormBuilder, Validators } from '@angular/forms';
import { usuariosModel } from 'src/app/Models/UsuariosModel';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent {

  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  usuariosForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Apellido: [null, [Validators.required, Validators.maxLength(30)]],
    Rol: [null, [Validators.required, Validators.max(150)]],
    Descripcion: [null, [Validators.required, Validators.maxLength(20)]],
    PlanID: [null, [Validators.required]],
  });

  infoUsuarios: usuariosModel = {
    FechaRegistro: new Date(),
    Nombres: "",
    Apellidos: "",
    Rol: "",
    TipoDoc:"",
    IdPlan: 0,
  };

  onSubmit(): void {
    if (this.usuariosForm.valid) {
      this.infoUsuarios.FechaRegistro = this.usuariosForm.controls['Fecha'].value;
      this.infoUsuarios.Nombres = this.usuariosForm.controls['Nombres'].value;
      this.infoUsuarios.Apellidos = this.usuariosForm.controls['Apellidos'].value;
      this.infoUsuarios.Rol = this.usuariosForm.controls['Rol'].value;
      this.infoUsuarios.TipoDoc = this.usuariosForm.controls['TipoDoc'].value;
      this.infoUsuarios.IdPlan = this.usuariosForm.controls['IdPlan'].value;

      this.dialog.closeAll();
      this.apiService.post('Maquinarias', this.infoUsuarios).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'El usuarii ha sido creado',
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
