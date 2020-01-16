import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../shared/categoria.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css']
})
export class CategoriaListaComponent implements OnInit {

  public records;
  private reloadList = new BehaviorSubject<boolean>(false);

  constructor( private service: CategoriaService ) { }

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