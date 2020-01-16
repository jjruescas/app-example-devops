import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor( private http: HttpClient ) { }

  public getGenerate() {
    return this.http.get( 'http://localhost:3000/generador');
  }
}
