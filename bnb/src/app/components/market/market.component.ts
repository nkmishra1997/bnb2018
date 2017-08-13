import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  companies : any;
  //customer : any;

  constructor(private marketService : MarketService,
              private router : Router ) { }

  ngOnInit() {

    this.marketService.fetchCompanies().subscribe(Companies => {
      this.companies = Companies;
    },
    err => {
      console.log(err);
      return false;
    });
  }


}
