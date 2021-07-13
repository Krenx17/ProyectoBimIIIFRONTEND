import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.model';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TournamentsService{
  public url: String;
  public identidad: any;
  public token: any;
  public headersvar = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  creartorneo(torneo: Tournament): Observable<any>{
    let data = JSON.stringify(torneo)
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.post(this.url + '/creartorneo', data, {headers: headersToken})
  }

  edittorneo(torneo: Tournament): Observable<any>{
    let idTorneo = this.getTorneo()
    let data = JSON.stringify(torneo)
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.put(this.url+'/edittorneo/' + idTorneo, data, {headers: headersToken})
    }

  deletetorneo(id: String): Observable<any>{
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.delete(this.url+'/deletetorneo/' + id, {headers: headersToken})
  }

  torneo(id: String): Observable<any>{
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.get(this.url+'/torneo/' + id, {headers: headersToken})
  }

  torneos(): Observable<any>{
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.get(this.url+'/torneos', {headers: headersToken})
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
}
