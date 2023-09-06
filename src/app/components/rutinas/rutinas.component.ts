import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

  tituloRutinas = "Rutinas";

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.Get("Rutinas");
  }

}
