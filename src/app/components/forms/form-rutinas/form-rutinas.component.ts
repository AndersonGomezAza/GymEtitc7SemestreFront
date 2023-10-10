import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-rutinas',
  templateUrl: './form-rutinas.component.html',
  styleUrls: ['./form-rutinas.component.css']
})
export class FormRutinasComponent {
  private fb = inject(FormBuilder);
  rutinasForm = this.fb.group({
    Calorias: [null, [Validators.required, Validators.max(60)]],
    Descripcion: [null, [Validators.required, Validators.maxLength(50)]],
    Nombre: [null, [Validators.required, Validators.maxLength(40)]],
    Categoria: [null, [Validators.required, Validators.maxLength(0)]],
    Tiempo: [null, [Validators.required, Validators.max(40)]]
  });

  hasUnitNumber = false;

  onSubmit(): void {
    alert('Thanks!');
  }
}
