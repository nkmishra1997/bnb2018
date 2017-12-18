import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  company : any;
  id : string;
  private sub:any;

  name:String;
  symbol:String;
  description:String;
  stockPrice:Number;
  availableQuantity:Number;
  totalQuantity:Number;
  annualGrowthRate:Number;
  marketcap:Number;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
    this.adminService.getCompanyDetail(this.id).subscribe(Company => {
      this.company = Company;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onSubmit(){
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

  this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
  });
  /*this.authService.addModifiedCompany(this.id, company).subscribe(data => {
      if(data.success){
        console.log(data.msg);
        this.router.navigate(['/admin/company']);
      }
      else{
        console.log(data.msg);
        this.router.navigate(['/admin/companydetail/'+ this.id]);
      }
  });*/console.log(this.name);
  }

}
