import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../../services/leaderboard.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ["../css/bootstrap.min.css",
  "../css/font-awesome.min.css",
  "../css/style.css",
  './leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  customer: any;

  constructor(private leaderboardService: LeaderboardService,
    private router: Router,
    private http: Http ) { }

  ngOnInit() {
    Observable.timer(0, 10000)
      .subscribe(() => {
        this.leaderboardService.fetchCustomers().subscribe(Customer => {
          this.customer = Customer; console.log("customer list fetched");
        },
        err => {
          console.log(err);
          return false;
        });
      });
  }

}
