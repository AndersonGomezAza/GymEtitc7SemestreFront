import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-planes',
  templateUrl: './form-planes.component.html',
  styleUrls: ['./form-planes.component.css']
})
export class FormPlanesComponent {
  private fb = inject(FormBuilder);
  planesForm = this.fb.group({
    Descripcion: [null, [Validators.required, Validators.maxLength(30)]],
    Duracion: [null, [Validators.required, Validators.max(12)]],
    Precio: [null, [Validators.required, Validators.pattern('^[0-9]+[^.]')]]
  });

  hasUnitNumber = false;

  onSubmit(): void {
    alert('Thanks!');
  }
}
