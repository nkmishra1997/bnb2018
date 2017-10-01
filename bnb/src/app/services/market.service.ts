import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MarketService {

  constructor(private http : Http) { }

  fetchCompanies(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('/companylist',{headers: headers})
    .map(res => res.json());
  }

  fetchCustomer(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('customerdetail',{headers : headers})
    .map(res => res.json());
  }
  
}
