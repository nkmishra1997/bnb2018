import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  constructor(private http : Http) { }

  fetchCompany(id){
    let headers = new Headers()
  //  let params = new URLSearchParams();
  //  params.set('id',id.toString())
    headers.append('Content-Type','application/json')
    return this.http.get('/companydetail/' + id,{ headers : headers })
    .map(res => res.json())
  }

  buy(id, form:Object){
    let headers = new Headers()
    headers.append('Content-Type','application/json')
    return this.http.post('/buy/'+ id, JSON.stringify(form), {headers:headers})
    .map(res => res.json())
  }

  sell(id, form:Object){
    let headers = new Headers()
    headers.append('Content-Type','application/json')
    return this.http.post('/sell/'+ id, JSON.stringify(form), {headers:headers})
    .map(res => res.json())
  }

  short(id, form:Object){
    let headers = new Headers()
    headers.append('Content-Type','application/json')
    return this.http.post('/short/'+ id, JSON.stringify(form), {headers:headers})
    .map(res => res.json())
  }

  cover(id, form:Object){
    let headers = new Headers()
    headers.append('Content-Type','application/json')
    return this.http.post('/cover/'+ id, JSON.stringify(form), {headers:headers})
    .map(res => res.json())
  }
}
