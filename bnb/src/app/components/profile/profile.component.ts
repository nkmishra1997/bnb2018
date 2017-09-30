import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customer : any;

  constructor(private profileService : ProfileService) { }

  ngOnInit() {

    this.profileService.fetchCustomer().subscribe(Customer => {
      this.customer = Customer;
    },
    err => {
      console.log(err);
      return false;
    });

  }

}
