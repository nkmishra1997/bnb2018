import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
company : any;
id : any;
private sub : any;
//customer : any;

  constructor(private companyService : CompanyService,
              private route : ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    
    this.companyService.fetchCompany(this.id).subscribe(Company => {
      this.company = Company;
    },
    err => {
      console.log(err);
      return false;
    });
/*
    this.companyService.fetchCustomer().subscribe(Customer => {
      this.customer = Customer;
    },
    err => {
        console.log(err);
        return false;
    });
*/
  }

}
