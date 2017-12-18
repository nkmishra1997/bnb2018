import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ["../css/bootstrap.min.css",
              "../css/font-awesome.min.css",
              "../css/style.css",
              './market.component.css'
  ]
})
export class MarketComponent implements OnInit {
  companies: any;
  customer: any;
  user: any;
  constructor(private marketService: MarketService,
              private router: Router,
              private http: Http ) { }

  ngOnInit() {
    
    this.marketService.fetchCompanies().subscribe(Companies => {
      this.companies = Companies;
    },
    err => {
      console.log(err);
      return false;
    });

    this.marketService.fetchCustomer().subscribe(Customer => {
      this.customer = Customer;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
