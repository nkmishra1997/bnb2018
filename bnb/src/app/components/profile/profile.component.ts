import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
   styleUrls: ["../css/bootstrap.min.css",
              "../css/font-awesome.min.css",
              "../css/style.css",
              './profile.component.css']
})
export class ProfileComponent implements OnInit {
  player : any;
  customer : any;


  check = function(company){
    for(var i=0;i<this.player.Customer.stockShorted.length;i++){
      if(company.company.name == this.player.Customer.stockShorted[i].company.name){
        return this.player.Customer.stockShorted[i].quantity
      }
    }
    return 0
  }

  quantity = this.check;


  constructor(private profileService : ProfileService) { }


  ngOnInit() {

    /*this.profileService.fetchCustomer().subscribe(Player => {
      this.player = Player;
    },
    err => {
      console.log(err);
      return false;
    });*/
    this.refreshPage();

  }

  loanMoney(){
    this.profileService.takeLoan().subscribe(Customer =>{
      this.customer = Customer
      console.log(Customer)
      this.refreshPage();
    },
    err => {
      console.log(err)
      return false
    })

  }

  repayMoney(){
    this.profileService.repayLoan().subscribe(Customer =>{
      this.customer = Customer
      console.log(Customer)
      this.refreshPage();
    },
    err => {
      console.log(err)
      return false
    })

  }

  refreshPage() {
    console.log("Inside refreshPage()");
    this.profileService.fetchCustomer().subscribe(Player => {
      this.player = Player;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
