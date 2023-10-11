import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit{
  dataPlan;

  private fb = inject(FormBuilder);
  usuariosForm = this.fb.group({
    Nombre: [null, [Validators.required, Validators.maxLength(30)]],
    Apellido: [null, [Validators.required, Validators.maxLength(30)]],
    Descripcion: [null, [Validators.required, Validators.max(150)]],
    Acciones: [null, [Validators.required, Validators.maxLength(20)]]
  });

  constructor (public apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.Get("Planes").then(res=>{
      this.dataPlan = res
    });
  }


  onSubmit(): void {
    alert('Thanks!');
  }
}
