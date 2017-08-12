import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  name:String;
  symbol:String;
  description:String;
  stockPrice:Number;
  availableQuantity:Number;
  totalQuantity:Number;
  annualGrowthRate:Number;
  marketcap:Number;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onCompanySubmit(){
  const company = {
    name:this.name,
    symbol:this.symbol,
    description:this.description,
    stockPrice:this.stockPrice,
    availableQuantity:this.availableQuantity,
    totalQuantity:this.totalQuantity,
    annualGrowthRate:this.annualGrowthRate,
    marketcap:this.marketcap
  }

  this.authService.addCompany(company).subscribe(data => {
      if(data.success){
        this.router.navigate(['/admin/company']);
      }
      else{
        this.router.navigate(['/admin/addcompany']);
      }
  });
  }

}
