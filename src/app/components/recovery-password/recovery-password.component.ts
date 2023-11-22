import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    Correo: [null, [Validators.required]],
  });

  infoRes = {}

  constructor(public apiService: ApiService ){}

  ngOnInit(): void {
    this.apiService.Get('logins').then(res=>{this.infoRes = res});
  }

  onSubmit(){
    if (this.loginForm.valid) {
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

        Swal.fire({
          title: 'Usuario Encontrado',
          text: `Hemos enviado un mensaje a tu correo para que restablezcas tu contraseña`,
          icon: 'success',
          color: '#716add',
        }).then((result) => {
          if (result.isConfirmed) {
            this.cancelRecovery();
          }
        })
      }
      if (encontrado == false) {
        Swal.fire(
          'usuario no encontrado',
          'Tu correo no se encuentra registrado con nosotros',
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

  cancelRecovery(){
    localStorage.removeItem('recovery');
    window.location.reload();
  }
}
