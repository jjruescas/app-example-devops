import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import { Opinion } from '../shared/opinion.model';
import { OpinionService } from '../shared/opinion.service';
import { PeliculaService } from 'src/app/pelicula/shared/pelicula.service';


@Component({
  selector: 'app-opinion-edit',
  templateUrl: './opinion-edit.component.html',
  styleUrls: ['./opinion-edit.component.css']
})
export class OpinionEditComponent implements OnInit {

  public formData: Opinion = new Opinion ();
  public recordForm: FormGroup;
  public recordFile1: string = '';
  public editedRecordId: number = 0;
  public editedRecord$ = new BehaviorSubject<number>(0);
  public id: number = 0;
  public peliculas;

  constructor(private service: OpinionService, private router: Router, private route: ActivatedRoute, private peliculaService: PeliculaService) { }


  ngOnInit() {
    this.recordForm = new FormGroup({
        'opinion_descripcion': new FormControl(null),
        'opinion_fecha': new FormControl(null),
        'fk_id_pelicula': new FormControl(null)
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
    this.peliculas = this.peliculaService.getRecords();
  }


loadRecord(id: number) {
  this.service.loadRecord(id).subscribe(
    (loadedRecord: any) => {
      this.recordForm.get('fk_id_pelicula').setValue(loadedRecord[0].fk_id_pelicula);
      this.recordForm.get('opinion_descripcion').setValue(loadedRecord[0].opinion_descripcion);
      this.recordForm.get('opinion_fecha').setValue(loadedRecord[0].opinion_fecha);
    }
  );
}


saveRecord() {
  this.formData = Object.assign(this.formData, this.recordForm.value);

  this.service.saveRecord(this.formData).subscribe(
    (data: any) => this.router.navigate(['blog/opinion-lista'])
  );
}


updateRecord() {
  this.formData = Object.assign(this.formData, this.recordForm.value);
  this.formData.id_opinion = this.editedRecordId;

  this.service.updateRecord(this.formData.id_opinion, this.formData).subscribe(
    (data: any) => this.router.navigate(['blog/opinion-lista'])
  );
}


  /* getCategoriasValues(categorias: Array<number>) {
    this.categoriaPelicula.push(...categorias)
  } */


}
