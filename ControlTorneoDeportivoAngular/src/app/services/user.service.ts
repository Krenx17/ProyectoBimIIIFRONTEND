import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class UserService {
  public url: String;
  public identidad: any;
  public token: any;
  public headersvar = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  login(usuario: User, getToken = ''): Observable<any>{
    if(getToken !=''){
      usuario.getToken = getToken
    }
    let data = JSON.stringify(usuario)

    return this._http.post(this.url+'/login', data, {headers: this.headersvar})
  }

  registro(usuario: User): Observable<any>{
    let data = JSON.stringify(usuario)

    return this._http.post(this.url+'/register', data, {headers: this.headersvar})
  }

  creadmin(admin: User): Observable<any>{
    let data = JSON.stringify(admin)
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.post(this.url+'/admin', data, {headers: headersToken})
  }

  edituser(usuario: User): Observable<any>{
    let data = JSON.stringify(usuario)
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.put(this.url + '/edituser/' + usuario._id, data, {headers: headersToken})
  }

  deleteuser(id: String): Observable<any>{
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.delete(this.url+'/deleteuser/' + id, {headers: headersToken})
  }

  admin(usuario: User): Observable<any>{
    let data = JSON.stringify(usuario)
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.post(this.url+'/admin', data, {headers: headersToken})
  }

  profile(id: any): Observable<any>{
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.get(this.url + '/userid/' + id, {headers: headersToken})
  }

  allusuarios(): Observable<any>{
    let headersToken = this.headersvar.set('Authorization', this.getToken2())

    return this._http.get(this.url + '/users', {headers: headersToken})
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
}
