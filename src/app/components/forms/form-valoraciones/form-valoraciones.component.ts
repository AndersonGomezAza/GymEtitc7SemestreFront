import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { valoracionesModels } from 'src/app/models/valoracionesModel';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-valoraciones',
  templateUrl: './form-valoraciones.component.html',
  styleUrls: ['./form-valoraciones.component.css']
})
export class FormValoracionesComponent implements OnInit{
  private fb = inject(FormBuilder);

  constructor(public dialog:MatDialog, public apiService: ApiService){}

  usuarios;

  valoracionesForm = this.fb.group({
    CategoriaValoracion: [null, [Validators.required, Validators.maxLength(20)]],
    DescripcionValoracion: [null, [Validators.required]],
    RecomendacionValoracion:  [null, [Validators.maxLength(300)]],
    numDocumentoUsuario:  [null, [Validators.required]],
  });

  infoValoraciones: valoracionesModels = {
    FechaValoracion: "",
    CategoriaValoracion:"",
    DescripcionValoracion:"",
    RecomendacionValoracion:"",
    idUsuario: 0,
  };

  ngOnInit(){
    this.apiService.Get('Usuarios').then(res => this.usuarios = res)
  }

  encontrarIdUsuario(numDocumento: number, usuarios) {
    const usuario = usuarios.find((usuario) => usuario.numDocumento === numDocumento);
    console.log(usuario)
    return usuario.idUsuario;
  }

  onSubmit(): void {
    var fechaActual = new Date();
    if (this.valoracionesForm.valid) {
      this.infoValoraciones.FechaValoracion = fechaActual.toLocaleDateString();
      this.infoValoraciones.CategoriaValoracion = this.valoracionesForm.controls['CategoriaValoracion'].value;
      this.infoValoraciones.DescripcionValoracion = this.valoracionesForm.controls['DescripcionValoracion'].value;
      this.infoValoraciones.RecomendacionValoracion = this.valoracionesForm.controls['RecomendacionValoracion'].value;
      this.infoValoraciones.idUsuario = this.encontrarIdUsuario(this.valoracionesForm.controls['numDocumentoUsuario'].value, this.usuarios);

      this.dialog.closeAll();
      this.apiService.post('Valoraciones', this.infoValoraciones).then(res=>{
        if (res == undefined) {
          Swal.fire({
            title: 'Creacion Realizada',
            text: 'La valoracion ha sido creada',
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
