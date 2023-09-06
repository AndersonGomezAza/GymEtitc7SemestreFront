import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-implementos',
  templateUrl: './implementos.component.html',
  styleUrls: ['./implementos.component.css']
})
export class ImplementosComponent implements OnInit{
  tituloImplementos = "Implementos";

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.Get("Implementos");
  }
}
