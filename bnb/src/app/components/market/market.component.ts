import { Component, OnInit} from '@angular/core';
import { MarketService } from '../../services/market.service';
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
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ["../css/bootstrap.min.css",
              "../css/font-awesome.min.css",
              "../css/style.css",
              './market.component.css']
})
export class MarketComponent implements OnInit {
  companies: any;
  cryptocompanies: any;
  customer: any;
  user: any;
  isInc: boolean;
  private subscription: Subscription;
  constructor(private marketService: MarketService,
              private router: Router,
              private http: Http ) { }

  ngOnInit() {

    
    this.marketService.fetchCustomer()
      .subscribe((Customer) => {
        this.customer = Customer; console.log("customer fetched");
      },
      err => {
        console.log(err);
        return false;
      });
      this.subscription = Observable.timer(0, 60000)
      .subscribe(() => {
        this.marketService.fetchCompanies().subscribe(Companies => {
          this.companies = Companies; console.log("Companies fetched");
        },
        err => {
          console.log(err);
          return false;
        });

        this.marketService.fetchcryptoCompanies().subscribe(Companies => {
          this.cryptocompanies = Companies; console.log("company fetched");
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

}
