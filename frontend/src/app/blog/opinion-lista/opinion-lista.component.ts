import { Component, OnInit } from '@angular/core';
import { OpinionService } from '../shared/opinion.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-opinion-lista',
  templateUrl: './opinion-lista.component.html',
  styleUrls: ['./opinion-lista.component.css']
})
export class OpinionListaComponent implements OnInit {

  public records;
  private reloadList = new BehaviorSubject<boolean>(false);

  constructor( private service: OpinionService ) { }

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