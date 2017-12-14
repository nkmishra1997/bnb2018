import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  player : any;

  check = function(company){
    for(var i=0;i<this.player.Customer.stockShorted.length;i++){
      if(company.company.name == this.player.Customer.stockShorted[i].company.name){
        return this.player.Customer.stockShorted[i].qantity
      }
      return 0
    }
  }

  quantity = this.check;

  constructor(private profileService : ProfileService) { }

  ngOnInit() {

    this.profileService.fetchCustomer().subscribe(Player => {
      this.player = Player;
    },
    err => {
      console.log(err);
      return false;
    });

  }

}
