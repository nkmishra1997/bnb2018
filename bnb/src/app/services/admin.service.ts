import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  constructor(private http : Http) { }

  fetchNews(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('/admin/newslist',{headers: headers})
    .map(res => res.json());
  }

  deleteNews(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('/admin/deleteNews/'+id,{headers: headers})
    .map(res => res.json());
  }

  addNews(news){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let body = JSON.stringify(news);
    console.log(body);
    return this.http.post('/admin/addNews/', body, {headers: headers} )
    .map(res => res.json());
  }

}
