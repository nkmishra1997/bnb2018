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
  company1: String;
  impact1: String;
  company2: String = '';
  impact2: String = '';
  company3: String = '';
  impact3: String = '';
  company4: String = '';
  impact4: String = '';
  company5: String = '';
  impact5: String = '';

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
        company : { _id: this.company1 },
        impact : this.impact1
      }]
    }
    if(this.company2!=''){
      news.newsImpact.push({
        company : { _id: this.company2 },
        impact : this.impact2
      });
    }
    if(this.company3!=''){
      news.newsImpact.push({
        company : { _id: this.company3 },
        impact : this.impact3
      });
    }
    if(this.company4!=''){
      news.newsImpact.push({
        company : { _id: this.company4 },
        impact : this.impact4
      });
    }
    if(this.company5!=''){
      news.newsImpact.push({
        company : { _id: this.company5 },
        impact : this.impact5
      });
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
