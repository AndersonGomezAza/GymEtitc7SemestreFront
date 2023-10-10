import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ImplementosComponent } from './components/implementos/implementos.component';
import { MaquinariasComponent } from './components/maquinarias/maquinarias.component';
import { PlanesComponent } from './components/planes/planes.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ValoracionesComponent } from './components/valoraciones/valoraciones.component';
import { AvatarModule } from 'ngx-avatars';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormActividadesComponent } from './components/forms/form-actividades/form-actividades.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUsuariosComponent } from './components/forms/form-usuarios/form-usuarios.component';
import { FormImplementosComponent } from './components/forms/form-implementos/form-implementos.component';
import { FormMaquinariasComponent } from './components/forms/form-maquinarias/form-maquinarias.component';
import { FormPlanesComponent } from './components/forms/form-planes/form-planes.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ActividadesComponent,
    ImplementosComponent,
    MaquinariasComponent,
    PlanesComponent,
    InicioComponent,
    RutinasComponent,
    UsuariosComponent,
    ValoracionesComponent,
    FormActividadesComponent,
    FormUsuariosComponent,
    FormImplementosComponent,
    FormMaquinariasComponent,
    FormPlanesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    MatTreeModule,
    AvatarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
