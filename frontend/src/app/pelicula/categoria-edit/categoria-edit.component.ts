import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';


@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  public formData: Categoria = new Categoria ();
  public recordForm: FormGroup;
  public recordFile1: string = '';
  public editedRecordId: number = 0;
  public editedRecord$ = new BehaviorSubject<number>(0);
  public id: number = 0;

  constructor(private service: CategoriaService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.recordForm = new FormGroup({
        'categoria_nombre': new FormControl(null)
    });

    this.route.paramMap.subscribe((params: any) => {
      this.editedRecordId = params.params.id;

      if (params.params.id) {
        this.editedRecord$.next(params.params.id);
        this.editedRecordId = params.params.id;
      } else {
        this.editedRecordId = 0;
      }
    });

    this.editedRecord$.subscribe(recordId => recordId > 0 ? this.loadRecord(recordId) : null);
  }


loadRecord(id: number) {
  this.service.loadRecord(id).subscribe(
    (loadedRecord: any) => {
        this.recordForm.get('categoria_nombre').setValue(loadedRecord[0].categoria_nombre);
    }
  );
}


saveRecord() {
  this.formData = Object.assign(this.formData, this.recordForm.value);

  this.service.saveRecord(this.formData).subscribe(
    (data: any) => this.router.navigate(['pelicula/categoria-lista'])
  );
}


updateRecord() {
  this.formData = Object.assign(this.formData, this.recordForm.value);
  this.formData.id_categoria = this.editedRecordId;

  this.service.updateRecord(this.formData.id_categoria, this.formData).subscribe(
    (data: any) => this.router.navigate(['pelicula/categoria-lista'])
  );
}


  /* getCategoriasValues(categorias: Array<number>) {
    this.categoriaPelicula.push(...categorias)
  } */


}
