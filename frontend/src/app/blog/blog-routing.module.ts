import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpinionListaComponent } from './opinion-lista/opinion-lista.component';
import { OpinionEditComponent } from './opinion-edit/opinion-edit.component';


const routes: Routes = [
  { path: 'blog/opinion-lista', component: OpinionListaComponent },
  { path: 'blog/opinion', component: OpinionEditComponent },
  { path: 'blog/opinion/edit/:id', component: OpinionEditComponent }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
