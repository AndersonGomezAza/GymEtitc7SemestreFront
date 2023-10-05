import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent {
  private fb = inject(FormBuilder);
  usuariosForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Apellido: [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.max(150)]],
    Acciones: [null, [Validators.required, Validators.maxLength(20)]]
  });


  hasUnitNumber = false;


  onSubmit(): void {
    alert('Thanks!');
  }
}
