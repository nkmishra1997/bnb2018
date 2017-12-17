import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
company : any;
id : any;
private sub : any;
info : any;
buyForm : FormGroup;
sellForm : FormGroup;
shortForm : FormGroup;
coverForm : FormGroup;

  constructor(private companyService : CompanyService,
              private route : ActivatedRoute,
              private formBuilder : FormBuilder) { }

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

    this.buyForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })

    this.sellForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })

    this.shortForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })

    this.coverForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })
  }

  buyStock(form : any){

    console.log(this.buyForm.value) //for testing only

    this.companyService.buy(this.id,form).subscribe(Info => {
      this.info = Info
    },
    err => {
      console.log(err)
      return false
    })
  }

  sellStock(form : any){

    console.log(this.sellForm.value)  //for testing only

    this.companyService.sell(this.id,form).subscribe(Info => {
      this.info = Info
    },
    err => {
      console.log(err)
      return false
    })
  }

  shortStock(form : any){

    console.log(this.shortForm.value) //for testing only

    this.companyService.short(this.id,form).subscribe(Info => {
      this.info = Info
    },
    err => {
      console.log(err)
      return false
    })
  }

  coverStock(form : any){

    console.log(this.coverForm.value) //for testing only

    this.companyService.cover(this.id,form).subscribe(Info => {
      this.info = Info
    },
    err => {
      console.log(err)
      return false
    })
  }

}
