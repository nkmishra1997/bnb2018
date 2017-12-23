import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

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
