import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../services/admin.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css']
})
export class NewslistComponent implements OnInit {
  news : any;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() { console.log("check 1");
    //this.refreshPage();
    this.adminService.getNews().subscribe(News => {
      this.news = News;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  /*deleteNews(id){
    this.authService.deletenews(id).subscribe(data => {
        this.refreshPage();
        console.log(data.msg);
    });
  }
  refreshPage(){ console.log("inside refreshpage()");
    this.adminService.getNews().subscribe(News => {
      this.news = News;
    },
    err => {
      console.log(err);
      return false;
    });
  }*/

}
