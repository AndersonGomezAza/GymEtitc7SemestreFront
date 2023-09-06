import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit{

  tituloValoraciones = "Valoraciones";

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.Get("Valoraciones");
  }
}
