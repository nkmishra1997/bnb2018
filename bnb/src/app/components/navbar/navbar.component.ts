import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

declare var require: any;
require('../js/jquery-3.2.0.min.js');
require('../js/bootstrap.min.js');
require('../js/preloader.js');
require('../js/script.js');

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ["../css/bootstrap.min.css",
              "../css/font-awesome.min.css",
              "../css/style.css",
    './navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customer: any;
  constructor(private marketService: MarketService,
              private router: Router,
              private http: Http) { }

  ngOnInit() {
        this.marketService.fetchCustomer().subscribe(Customer => {
      this.customer = Customer;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
