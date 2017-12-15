import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  admin : any;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminService.fetchAdmin().subscribe(Customer => {
      this.admin = Customer;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
