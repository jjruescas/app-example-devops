import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pelicula } from './pelicula.model';

interface ServerResponse {
  success: string;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('observe', 'response');


  constructor( private http: HttpClient ) { }


  public getRecords() {
    return this.http.get( 'http://localhost:3000/pelicula');
  }


  public loadRecord(id) {
    return this.http.get( `http://localhost:3000/pelicula/${id}`);
  }


  public saveRecord( record: Pelicula ) {
    return this.http.post<ServerResponse>( 'http://localhost:3000/pelicula', record, { headers: this.headers });
  }


  public updateRecord( id: number, record: Pelicula ) {
    return this.http.put<ServerResponse>( `http://localhost:3000/pelicula/${id}`, record, { headers: this.headers });
  }


  public deleteRecord( id: number ) {
    return this.http.delete<ServerResponse>( `http://localhost:3000/pelicula/${id}`, { headers: this.headers });
  }

}