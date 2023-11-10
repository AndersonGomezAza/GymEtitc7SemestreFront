import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    nombreLogin: "",
  };
  resLogin = {};
  loginStorage = {};
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
      var encontrado;
      this.infoLogin.correoLogin = String(this.loginForm.controls['Correo'].value).toLowerCase();
      this.infoLogin.passwordLogin = String(this.loginForm.controls['Password'].value).toLowerCase();
      for (var i = 0; i < Object.keys(this.resLogin).length; i++) {
        var login = this.resLogin[i];
        if (login['correoUsuario'] ==  this.infoLogin.correoLogin && login['passwordUsuario'] ==  this.infoLogin.passwordLogin) {
          localStorage.setItem('login', JSON.stringify(login))
          this.infoLogin.nombreLogin = `${login['nombreUsuario']} ${login['apellidoUsuario']}`
          encontrado = true;
          break;
        } else {
          encontrado = false;
        }
      }
      if (encontrado == true) {

        Swal.fire({
          title: 'Usuario Encontrado',
          text: `Bienvenido usuario ${this.infoLogin.nombreLogin}`,
          icon: 'success',
          color: '#716add',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/Actividades';
          }
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
