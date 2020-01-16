import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BlogRoutingModule } from './blog-routing.module';
import { OpinionListaComponent } from './opinion-lista/opinion-lista.component';
import { OpinionEditComponent } from './opinion-edit/opinion-edit.component';


@NgModule({
  declarations: [OpinionListaComponent, OpinionEditComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class BlogModule { }
