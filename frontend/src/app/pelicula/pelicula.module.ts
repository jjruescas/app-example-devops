import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { PeliculaListaComponent } from './pelicula-lista/pelicula-lista.component';
import { PeliculaEditComponent } from './pelicula-edit/pelicula-edit.component';


@NgModule({
  declarations: [CategoriaListaComponent, CategoriaEditComponent, PeliculaListaComponent, PeliculaEditComponent],
  imports: [
    CommonModule,
    PeliculaRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class PeliculaModule { }
