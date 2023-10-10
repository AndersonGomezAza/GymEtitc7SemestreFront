import { Component, inject } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-valoraciones',
  templateUrl: './form-valoraciones.component.html',
  styleUrls: ['./form-valoraciones.component.css']
})
export class FormValoracionesComponent {
  private fb = inject(FormBuilder);
  valoracionesForm = this.fb.group({
    Fecha: [new Date(), [Validators.required]],
    Categoria: [null, [Validators.required, Validators.maxLength(20)]],
    Descripcion: [null, [Validators.required, Validators.maxLength(30)]], 
    Nombres:  [null, [Validators.required, Validators.maxLength(30)]],
    Apellidos:  [null, [Validators.required, Validators.maxLength(30)]],
  });

  hasUnitNumber = false;

  onSubmit(): void {
    alert('Thanks!');
  }
}
