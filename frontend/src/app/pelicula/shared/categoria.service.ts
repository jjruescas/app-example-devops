import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from './categoria.model';

interface ServerResponse {
  success: string;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('observe', 'response');


  constructor( private http: HttpClient ) { }


  public getRecords() {
    return this.http.get( 'http://localhost:3000/categoria');
  }


  public loadRecord(id) {
    return this.http.get( `http://localhost:3000/categoria/${id}`);
  }


  public saveRecord( record: Categoria ) {
    return this.http.post<ServerResponse>( 'http://localhost:3000/categoria', record, { headers: this.headers });
  }


  public updateRecord( id: number, record: Categoria ) {
    return this.http.put<ServerResponse>( `http://localhost:3000/categoria/${id}`, record, { headers: this.headers });
  }


  public deleteRecord( id: number ) {
    return this.http.delete<ServerResponse>( `http://localhost:3000/categoria/${id}`, { headers: this.headers });
  }

}