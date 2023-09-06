import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit{
  tituloActividades = "Actividades";

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.Get("Actividades");
  }
}
