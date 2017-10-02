import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customer : any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    /*this.authService.getCustomer().subscribe(Customer => {
      this.customer = Customer;
    },
    err => {
      console.log(err);
      return false;
    });*/
  }

}
