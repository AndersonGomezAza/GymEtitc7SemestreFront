import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginModel } from 'src/app/models/loginModels';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarusuario',
  templateUrl: './registrarusuario.component.html',
  styleUrls: ['./registrarusuario.component.css']
})
export class RegistrarusuarioComponent implements OnInit {
  private fb = inject(FormBuilder);

  constructor(public apiService: ApiService, public dialog: MatDialog){}

  loginForm = this.fb.group({
    Correo: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
    Password: [null, [Validators.required]],
    PasswordConfirm: [null, [Validators.required]],
    Nombres: [null, [Validators.required]],
    Apellidos: [null, [Validators.required]],
  });
  infoUsuarios: LoginModel = {
    correoUsuario: "",
    passwordUsuario: "",
    nombreUsuario: "",
    apellidoUsuario: "",
  };
  ConfirmPass = false;
  textError = 'Por favor ingrese todos los campos requeridos';
  infoRes = {}

  ngOnInit(): void {
    this.apiService.Get('logins').then(res=>{this.infoRes = res});
  }

  ConfirmPassword(){
    if (this.loginForm.controls['Password'].value == this.loginForm.controls['PasswordConfirm'].value ) {
      this.ConfirmPass = true;
      this.textError = 'Por favor ingrese todos los campos requeridos';
    } else {
      this.loginForm.controls['PasswordConfirm'].setErrors(Validators.required)
      this.textError = 'Las contraseñas no coinciden';
    }
  }

  onSubmit(){
    var encontrado;
    for (var i = 0; i < Object.keys(this.infoRes).length; i++) {
      var login = this.infoRes[i];
      if (login['correoUsuario'] ==  this.loginForm.controls['Correo'].value) {
        encontrado = true;
        break;
      } else {
        encontrado = false;
      }
    }
    if (encontrado == true) {
      Swal.fire(
        'Correo Registrado',
        'El correo digitado ya existe por favor verifique el correo o intente recuperando contraseña',
        'error'
      )
    }
    if (encontrado == false) {
      if (this.loginForm.valid && this.ConfirmPass) {
        this.infoUsuarios.correoUsuario = this.loginForm.controls['Correo'].value;
        this.infoUsuarios.passwordUsuario = this.loginForm.controls['Password'].value;
        this.infoUsuarios.nombreUsuario = this.loginForm.controls['Nombres'].value;
        this.infoUsuarios.apellidoUsuario = this.loginForm.controls['Apellidos'].value;
        this.dialog.closeAll();
        this.apiService.post('Logins', this.infoUsuarios).then(res=>{
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El usuario ha sido creado',
              icon: 'success',
              color: '#716add',
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem('register');
                window.location.reload();
              }
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
          this.textError,
          'error'
        )
      }
    }
  }

  cancelRegister() {
    localStorage.removeItem('register');
    window.location.reload();
  }
}
