import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})

export class MatchService{
  public url: String;
  public identidad: any;
  public token: any;
  public headersvar = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  crearpartido(partido: Match): Observable<any>{
    let data = JSON.stringify(partido)
    let idTorneo = this.getTorneo()
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.post(this.url+'/match/' + idTorneo, data, {headers: headersToken})
  }

  editpartido(partido: Match): Observable<any>{
    let idTorneo = this.getTorneo()
    let idPartido = this.getPartido()
    let data = JSON.stringify(partido)
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.put(this.url+'/editmatch/' + idTorneo + '/' + idPartido, data, {headers: headersToken})
  }

  deletepartido(id: String){
    let idTorneo = this.getTorneo()
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.delete(this.url+'/deletematch/' + idTorneo + '/' + id, {headers: headersToken})
  }

  partido(id: String): Observable<any>{
    let idTorneo = this.getTorneo()
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.get(this.url+'/partido/' + idTorneo + '/' + id, {headers: headersToken})
  }

  partidos(): Observable<any>{
    let idTorneo = this.getTorneo()
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.get(this.url+'/matchs/' + idTorneo, {headers: headersToken})
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad') || '{}');
    if (identidad2 !="undefined"){
      this.identidad =identidad2
    }else{
      this.identidad = null
    }
    return this.identidad;
  }

  getToken2(){
    var token2 = localStorage.getItem('token')
    if (token2 !="undefined"){
      this.token =token2
    }else{
      this.token = null
    }
    return this.token;
  }

  getTorneo(){
    var token2 = localStorage.getItem('torneo')
    if (token2 !="undefined"){
      this.token =token2
    }else{
      this.token = null
    }
    return this.token;
  }

  getPartido(){
    var token2 = localStorage.getItem('partido')
    if (token2 !="undefined"){
      this.token =token2
    }else{
      this.token = null
    }
    return this.token;
  }
}
