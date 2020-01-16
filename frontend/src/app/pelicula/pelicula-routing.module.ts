import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeliculaListaComponent } from './pelicula-lista/pelicula-lista.component';
import { PeliculaEditComponent } from './pelicula-edit/pelicula-edit.component';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';

const routes: Routes = [
  { path: 'pelicula/pelicula-lista', component: PeliculaListaComponent },
  { path: 'pelicula/pelicula', component: PeliculaEditComponent },
  { path: 'pelicula/pelicula/edit/:id', component: PeliculaEditComponent },

  { path: 'pelicula/categoria-lista', component: CategoriaListaComponent },
  { path: 'pelicula/categoria', component: CategoriaEditComponent },
  { path: 'pelicula/categoria/edit/:id', component: CategoriaEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculaRoutingModule { }
