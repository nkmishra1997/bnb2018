import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../../services/leaderboard.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/observable/timer';
import {Subscription} from "rxjs";

declare var require: any;
require('../js/jquery-3.2.0.min.js');
require('../js/bootstrap.min.js');
require('../js/preloader.js');
require('../js/script.js');

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ["../css/bootstrap.min.css",
  "../css/font-awesome.min.css",
  "../css/style.css",
  './leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  playerList: any;
  private subscription: Subscription;

  constructor(private leaderboardService: LeaderboardService,
    private router: Router,
    private http: Http ) { }

  ngOnInit() {
    this.subscription = Observable.timer(0, 120000)
      .subscribe(() => {
        this.leaderboardService.fetchCustomers().subscribe(playerList => {
          this.playerList = playerList
          console.log(playerList)
        },
        err => {
          console.log(err)
          return false
        })
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
