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

  getCustomer(){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.get('/adminDashboard',{headers: headers})
    .map(res => res.json());
  }

  fetchCompany(){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.get('/admin/companylist',{headers: headers})
    .map(res => res.json());
  }

  addCompany(company){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.post('/admin/addCompany', company, {headers: headers})
    .map(res => res.json());
  }

  getNews(){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.get('/admin/newslist',{headers: headers})
    .map(res => res.json());
  }

  addNews(news){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.post('/admin/addNews', news, {headers: headers})
    .map(res => res.json());
  }

  getNewsDetail(id){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.get('/admin/newsDetails/' + id,{headers: headers})
    .map(res => res.json());
  }

  addModifiedNews(id, news){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.post('/admin/modifyNews/' + id, news, {headers: headers})
    .map(res => res.json());
  }

  getCompanyDetail(id){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.get('/admin/companyDetail/' + id,{headers: headers})
    .map(res => res.json());
  }

  addModifiedCompany(id, company){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.post('/admin/modifyCompany/' + id, company, {headers: headers})
    .map(res => res.json());
  }

  deleteCompany(id){
    let headers = new Headers();
    headers.append('access_token', 'EAADnnBRP9lQBAFcavJRWV567GMQ5Ezw32D6Ra6mZAjerI4WZABFzL1e4CcJRZC5YSOtbiywcWvqqcA9kWyROtxDi3T7MUcn0AjH4RZAeDdo8sEQ4jED04ygFDZClOGAZAL8J5PqkLwLop7yZCuZAhLZBf0CwS1YfZAbyw5WuZCSVEExZCwZDZD');
    headers.append('Content-Type','application/json');
    return this.http.delete('/admin/deleteCompany/' + id, {headers: headers})
    .map(res => res.json());
  }

}
