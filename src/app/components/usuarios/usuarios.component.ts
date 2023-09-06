import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  tituloUsuarios = "Usuarios";

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.Get("Usuarios");
  }
}
