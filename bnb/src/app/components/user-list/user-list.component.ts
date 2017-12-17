import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user : any;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshPage();
  }

  deleteUser(id){
    /*this.authService.deleteuser(id).subscribe(data => {
        this.refreshPage();
        console.log(data.msg);
    });*/
  }

  refreshPage(){
    this.adminService.fetchUser().subscribe(User => {
      this.user = User;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
