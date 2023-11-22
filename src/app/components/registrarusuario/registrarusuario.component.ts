import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registrarusuario',
  templateUrl: './registrarusuario.component.html',
  styleUrls: ['./registrarusuario.component.css']
})
export class RegistrarusuarioComponent {
  private fb = inject(FormBuilder);

  constructor(public apiService: ApiService){}

  loginForm = this.fb.group({
    Correo: [null, [Validators.required]],
    Password: [null, [Validators.required]],
    Nombres: [null, [Validators.required]],
    Apellidos: [null, [Validators.required]],
  });

  onSubmit(){

  }

  cancelRegister() {
    sessionStorage.removeItem('register');
    window.location.reload();
  }
}
