import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/observable/timer';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-adminnewslist',
  templateUrl: './adminnewslist.component.html',
  styleUrls: ['./adminnewslist.component.css']
})
export class AdminnewslistComponent implements OnInit {
  news : any;
  private subscription: Subscription;
  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = Observable.timer(0, 10000)
      .subscribe(() => {
        this.adminService.fetchNews().subscribe(News => {
          this.news = News; console.log("News fetched");
        },
        err => {
          console.log(err);
          return false;
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteNews(id){
    this.adminService.deleteNews(id).subscribe(data => {
        this.refreshPage();
        console.log(data.msg);
    });
  }

  refreshPage(){
    this.adminService.fetchNews().subscribe(News => {
      this.news = News;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
