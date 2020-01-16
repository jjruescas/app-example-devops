import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import { Pelicula } from '../shared/pelicula.model';
import { PeliculaService } from '../shared/pelicula.service';
import { CategoriaService } from '../shared/categoria.service';


@Component({
  selector: 'app-pelicula-edit',
  templateUrl: './pelicula-edit.component.html',
  styleUrls: ['./pelicula-edit.component.css']
})
export class PeliculaEditComponent implements OnInit {

  public formData: Pelicula = new Pelicula();
  public recordForm: FormGroup;
  public recordFile1: string = '';
  public editedRecordId: number = 0;
  public editedRecord$ = new BehaviorSubject<number>(0);
  public id: number = 0;
  public categorias;

  constructor(private service: PeliculaService, private router: Router, private route: ActivatedRoute, private categoriaService: CategoriaService) { }


  ngOnInit() {
    this.recordForm = new FormGroup({
      'fk_id_categoria': new FormControl(null),
      'nombre_pelicula': new FormControl(null),
      'pelicula_poster': new FormControl(null),
      'rating_pelicula': new FormControl(null),
      'fecha_estreno': new FormControl(null)
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
    this.categorias = this.categoriaService.getRecords();
  }


  loadRecord(id: number) {
    this.service.loadRecord(id).subscribe(
      (loadedRecord: any) => {
        this.recordForm.get('fecha_estreno').setValue(loadedRecord[0].fecha_estreno);
        this.recordForm.get('fk_id_categoria').setValue(loadedRecord[0].fk_id_categoria);
        this.recordForm.get('nombre_pelicula').setValue(loadedRecord[0].nombre_pelicula);
        this.recordForm.get('pelicula_poster').setValue(loadedRecord[0].pelicula_poster);
        this.recordForm.get('rating_pelicula').setValue(loadedRecord[0].rating_pelicula);
      }
    );
  }


  saveRecord() {
    this.formData = Object.assign(this.formData, this.recordForm.value);

    this.service.saveRecord(this.formData).subscribe(
      (data: any) => this.router.navigate(['pelicula/pelicula-lista'])
    );
  }


  updateRecord() {
    this.formData = Object.assign(this.formData, this.recordForm.value);
    this.formData.id_pelicula = this.editedRecordId;

    this.service.updateRecord(this.formData.id_pelicula, this.formData).subscribe(
      (data: any) => this.router.navigate(['pelicula/pelicula-lista'])
    );
  }


  /* getCategoriasValues(categorias: Array<number>) {
    this.categoriaPelicula.push(...categorias)
  } */


}
