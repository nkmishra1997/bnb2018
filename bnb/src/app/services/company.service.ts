import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  constructor(private http : Http) { }

  fetchCompany(id){
    let headers = new Headers();
  //  let params = new URLSearchParams();
  //  params.set('id',id.toString())
    headers.append('Content-Type','application/json');
    return this.http.get('/companydetail/' + id,{ headers : headers })
    .map(res => res.json());
  }
/*
  fetchCustomer(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('customerdetail',{headers : headers})
    .map(res => res.json());
  }
*/
}
