import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private http : Http) { }

  fetchCustomer(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('/customerdetail',{headers:headers})
    .map(res => res.json());
  }

}
