import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../shared/pelicula.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pelicula-lista',
  templateUrl: './pelicula-lista.component.html',
  styleUrls: ['./pelicula-lista.component.css']
})
export class PeliculaListaComponent implements OnInit {

  public records;
  private reloadList = new BehaviorSubject<boolean>(false);

  constructor( private service: PeliculaService ) { }

  ngOnInit() {
    this.getListData();
    this.reloadList.subscribe( update => update === true ? this.getListData() : null);
  }


  getListData() {
    this.records = this.service.getRecords();
  }


  removeItem( id: number ) {
    this.service.deleteRecord(id).subscribe(
      (response: any) => this.reloadList.next(true)
    );
  }

}