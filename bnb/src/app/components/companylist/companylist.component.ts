import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {
  company : any;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshPage();
  }

  deleteCompany(id){
    /*this.authService.deletecompany(id).subscribe(data => {
        this.refreshPage();
        console.log(data.msg);
    });*/
  }

  refreshPage(){
    this.adminService.fetchCompany().subscribe(Company => {
      this.company = Company;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}