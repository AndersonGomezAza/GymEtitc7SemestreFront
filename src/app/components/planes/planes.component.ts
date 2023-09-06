import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit{
  tituloPlanes = "Planes";

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.Get("Planes");
  }
}
