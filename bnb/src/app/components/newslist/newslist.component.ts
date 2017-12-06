import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css']
})
export class NewslistComponent implements OnInit {
  news : any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.refreshPage();
  }

  /*deleteNews(id){
    this.authService.deletenews(id).subscribe(data => {
        this.refreshPage();
        console.log(data.msg);
    });
  }

  refreshPage(){
    this.authService.getNews().subscribe(News => {
      this.news = News;
    },
    err => {
      console.log(err);
      return false;
    });
  }*/

}
