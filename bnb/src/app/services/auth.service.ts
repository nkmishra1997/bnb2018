import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http:Http) { }

  fetchNews(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('/newslist',{headers: headers})
    .map(res => res.json());
  }

}
