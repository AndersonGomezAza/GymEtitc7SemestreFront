import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  infoLogin = {
    correoLogin: "",
    passwordLogin: "",
  };
  resLogin = {};
  constructor(public apiService: ApiService){}

  loginForm = this.fb.group({
    Correo: [null, [Validators.required]],
    Password: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.apiService.Get('Logins').then(res=>{
      return this.resLogin = res;
    })
  }

  onSubmit(){
    if (this.loginForm.valid) {
      var encontrado = true;
      this.infoLogin.correoLogin = this.loginForm.controls['Correo'].value;
      this.infoLogin.passwordLogin = this.loginForm.controls['Password'].value;
      for (var i = 0; i < Object.keys(this.resLogin).length; i++) {
        var login = this.resLogin[i];
        if (login['correoUsuario'] ==  this.infoLogin.correoLogin && login['passwordUsuario'] ==  this.infoLogin.passwordLogin) {
          break;
        } else {
          encontrado = false;
        }
      }
      if (encontrado == true) {
        Swal.fire({
          title: 'Usuario Encontrado',
          text: `Bienvenido usuario ${this.infoLogin.correoLogin}`,
          icon: 'success',
          color: '#716add',
        })
      }
      if (encontrado == false) {
        Swal.fire(
          'usuario no encontrado',
          'Por favor ingrese todos los campos requeridos',
          'error'
        )
      }
    } else {
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }
}
