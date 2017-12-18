import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  constructor(private http : Http) { }

    fetchAdmin(){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get('/adminDashboard',{headers:headers})
      .map(res => res.json());
    }

    getNews(){
      let headers = new Headers();console.log("inside service");
      headers.append('Content-Type','application/json');
      return this.http.get('/admin/newslist',{headers: headers})
      .map(res => res.json());
    }

    getNewsDetail(id){
      let headers = new Headers();console.log("inside service");
      headers.append('Content-Type','application/json');
      return this.http.get('admin/newsDetail/'+id,{headers: headers})
      .map(res => res.json());
    }

    fetchUser(){
      let headers = new Headers();console.log("inside service");
      headers.append('Content-Type','application/json');
      return this.http.get('/admin/userlist',{headers: headers})
      .map(res => res.json());
    }

    fetchCompany(){
      let headers = new Headers();console.log("inside service");
      headers.append('Content-Type','application/json');
      return this.http.get('/admin/companylist',{headers: headers})
      .map(res => res.json());
    }

    getUserDetail(id){
      let headers = new Headers();console.log("inside service");
      headers.append('Content-Type','application/json');
      return this.http.get('admin/userDetails/'+id,{headers: headers})
      .map(res => res.json());
    }

    getCompanyDetail(id){
      let headers = new Headers();console.log("inside service");
      headers.append('Content-Type','application/json');
      return this.http.get('admin/companyDetail/'+id,{headers: headers})
      .map(res => res.json());
    }


}
