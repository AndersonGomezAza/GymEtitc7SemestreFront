import { Component, inject, OnInit } from '@angular/core';


import { FormBuilder, Validators } from '@angular/forms';
import { usuariosModel } from 'src/app/models/usuariosModel';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit{

  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  planes;

  usuariosForm = this.fb.group({
    Nombres: [null, [Validators.required, Validators.maxLength(30)]],
    Apellidos: [null, [Validators.required, Validators.maxLength(30)]],
    Rol: [null, [Validators.required, Validators.max(150)]],
    TipoDoc: [null, [Validators.required, Validators.maxLength(20)]],
    NumDocumento: [null, [Validators.required]],
    DescripcionPlan: [null, [Validators.required]],
  });

  infoUsuarios: usuariosModel = {
    FechaRegistro: "",
    Nombres: "",
    Apellidos: "",
    Rol: "",
    TipoDoc:"",
    NumDocumento: 0,
    IdPlan: 0,
  };

  ngOnInit(){
    this.apiService.Get('planes').then(res => this.planes = res)
  }

  encontrarIdPlan(descripcion: string, planes) {
    const plan = planes.find((plan) => plan.descripcionPlan === descripcion);
    console.log(plan.idPlan);
    return plan.idPlan;
  }

  onSubmit(): void {
    var fechaActual = new Date;
    if (this.usuariosForm.valid) {
      this.infoUsuarios.FechaRegistro = fechaActual.toLocaleDateString();
      this.infoUsuarios.Nombres = this.usuariosForm.controls['Nombres'].value;
      this.infoUsuarios.Apellidos = this.usuariosForm.controls['Apellidos'].value;
      this.infoUsuarios.Rol = this.usuariosForm.controls['Rol'].value;
      this.infoUsuarios.TipoDoc = this.usuariosForm.controls['TipoDoc'].value;
      this.infoUsuarios.TipoDoc = this.usuariosForm.controls['NumDocumento'].value;
      this.infoUsuarios.IdPlan = this.encontrarIdPlan(this.usuariosForm.controls['DescripcionPlan'].value, this.planes);

      console.log(this.infoUsuarios)
      this.dialog.closeAll();
      this.apiService.post('Usuarios', this.infoUsuarios).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'El usuario ha sido creado',
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
