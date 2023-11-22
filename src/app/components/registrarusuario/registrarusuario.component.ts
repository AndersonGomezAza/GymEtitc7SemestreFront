import { Component, inject } from '@angular/core';
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
export class RegistrarusuarioComponent {
  private fb = inject(FormBuilder);

  constructor(public apiService: ApiService, public dialog: MatDialog){}

  loginForm = this.fb.group({
    Correo: [null, [Validators.required]],
    Password: [null, [Validators.required]],
    Nombres: [null, [Validators.required]],
    Apellidos: [null, [Validators.required]],
  });

  infoUsuarios: LoginModel = {
    correoUsuario: "",
    passwordUsuario: "",
    nombreUsuario: "",
    apellidoUsuario: "",
  };

  onSubmit(){
    if (this.loginForm.valid) {
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
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }

  cancelRegister() {
    localStorage.removeItem('register');
    window.location.reload();
  }
}
