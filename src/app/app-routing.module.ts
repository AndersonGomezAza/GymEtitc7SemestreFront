import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ImplementosComponent } from './components/implementos/implementos.component';
import { MaquinariasComponent } from './components/maquinarias/maquinarias.component';
import { PlanesComponent } from './components/planes/planes.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ValoracionesComponent } from './components/valoraciones/valoraciones.component';

const routes: Routes = [
  { path: "", component:ActividadesComponent },
  //{ path: "Inicio", component:InicioComponent },
  { path: "Actividades", component:ActividadesComponent },
  { path: "Implementos", component:ImplementosComponent },
  { path: "Maquinarias", component:MaquinariasComponent },
  { path: "Planes", component:PlanesComponent },
  { path: "Rutinas", component:RutinasComponent },
  { path: "Usuarios", component:UsuariosComponent },
  { path: "Valoraciones", component:ValoracionesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
