import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-adminaddnews',
  templateUrl: './adminaddnews.component.html',
  styleUrls: ['./adminaddnews.component.css']
})
export class AdminaddnewsComponent implements OnInit {
  newsText : String;
  youtubeSrc : String;
  flag : Boolean;
  newsImpact : Array<Object>;
  company: String;
  impact: String;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onNewsSubmit(){
    const news = {
      newsText : this.newsText,
      youtubeSrc : this.youtubeSrc,
      flag : this.flag,
      newsImpact : [{
        company : { _id: this.company },
        impact : this.impact
      }]
    }
  
    this.adminService.addNews(news).subscribe(data => {
        if(data.success){
          console.log("saved");
          this.router.navigate(['/admin/news']);
        }
        else{
          console.log('not saved');
          this.router.navigate(['/admin/addnews']);
        }
    });
    }

}
