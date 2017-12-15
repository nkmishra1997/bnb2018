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

}
