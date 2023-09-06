import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ImplementosComponent } from './components/implementos/implementos.component';
import { MaquinariasComponent } from './components/maquinarias/maquinarias.component';
import { PlanesComponent } from './components/planes/planes.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path: "", component:InicioComponent },
  { path: "Inicio", component:InicioComponent },
  { path: "Actividades", component:ActividadesComponent },
  { path: "Implementos", component:ImplementosComponent },
  { path: "Maquinarias", component:MaquinariasComponent },
  { path: "Planes", component:PlanesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
