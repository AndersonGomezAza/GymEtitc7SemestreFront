import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  sesionIniciada;

  ngOnInit(): void {
      if (sessionStorage.key(0) == 'login') {
        this.sesionIniciada = 0;
      } else if (sessionStorage.key(0) == 'recovery') {
        this.sesionIniciada = 1;
      } else if (sessionStorage.key(0) == 'register'){
        this.sesionIniciada = 2;
      } else {
        this.sesionIniciada = 3;
      }
  }
}
