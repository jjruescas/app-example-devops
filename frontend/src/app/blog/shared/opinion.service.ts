import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Opinion } from './opinion.model';

interface ServerResponse {
  success: string;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('observe', 'response');


  constructor( private http: HttpClient ) { }


  public getRecords() {
    return this.http.get( 'http://localhost:3000/opinion');
  }


  public loadRecord(id) {
    return this.http.get( `http://localhost:3000/opinion/${id}`);
  }


  public saveRecord( record: Opinion ) {
    return this.http.post<ServerResponse>( 'http://localhost:3000/opinion', record, { headers: this.headers });
  }


  public updateRecord( id: number, record: Opinion ) {
    return this.http.put<ServerResponse>( `http://localhost:3000/opinion/${id}`, record, { headers: this.headers });
  }


  public deleteRecord( id: number ) {
    return this.http.delete<ServerResponse>( `http://localhost:3000/opinion/${id}`, { headers: this.headers });
  }

}