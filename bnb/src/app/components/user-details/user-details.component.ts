import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  User : any;
  id : string;
  private sub:any;
  
  //User:{
    //Customer:{
  ban: Boolean;
  admin: Boolean;
  accountBalance: Number;
  taken: Boolean;
  amount: Number;//}}

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
    /*this.authService.getUserDetail(this.id).subscribe(User => {
      this.User = User;
    },
    err => {
      console.log(err);
      return false;
    });*/
  }

  onSubmit(){
    console.log(this.User.Customer.ban);
    /*const user = {
    ban : this.ban,
    admin : this.admin,
    iaccountBalance : this.accountBalance,
    loan : {
      taken : this.loan.taken,
      amount : this.loan.amount
    }
  }

  this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
  });
  this.authService.addModifiedUser(this.id, user).subscribe(data => {
      if(data.success){
        console.log(data.msg);
        this.router.navigate(['/admin/user']);
      }
      else{
        console.log(data.msg);
        this.router.navigate(['/admin/userdetail/', this.id]);
      }
  });*/
  }

}
