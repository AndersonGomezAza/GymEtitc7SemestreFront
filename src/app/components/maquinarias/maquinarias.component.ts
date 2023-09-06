import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-maquinarias',
  templateUrl: './maquinarias.component.html',
  styleUrls: ['./maquinarias.component.css']
})
export class MaquinariasComponent implements OnInit{
  tituloMaquinaria = "Maquinarias";

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.Get("Maquinarias");
  }
}
