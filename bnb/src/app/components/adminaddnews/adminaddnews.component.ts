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
  company1: String = '';
  impact1: String = '';
  company2: String = '';
  impact2: String = '';
  company3: String = '';
  impact3: String = '';
  company4: String = '';
  impact4: String = '';
  company5: String = '';
  impact5: String = '';
  company6: String = '';
  impact6: String = '';
  company7: String = '';
  impact7: String = '';
  company8: String = '';
  impact8: String = '';
  company9: String = '';
  impact9: String = '';
  company10: String = '';
  impact10: String = '';
  company11: String = '';
  impact11: String = '';

  company12: String = '';
  impact12: String = '';
  company13: String = '';
  impact13: String = '';
  company14: String = '';
  impact14: String = '';
  company15: String = '';
  impact15: String = '';
  company16: String = '';
  impact16: String = '';
  company17: String = '';
  impact17: String = '';
  company18: String = '';
  impact18: String = '';
  company19: String = '';
  impact19: String = '';

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
      newsImpact : []
    }
    if(this.company1!=''){
      news.newsImpact.push({
        company : { _id: this.company1 },
        impact : this.impact1
      });
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
    if(this.company6!=''){
      news.newsImpact.push({
        company : { _id: this.company6 },
        impact : this.impact6
      });
    }
    if(this.company7!=''){
      news.newsImpact.push({
        company : { _id: this.company7 },
        impact : this.impact7
      });
    }
    if(this.company8!=''){
      news.newsImpact.push({
        company : { _id: this.company8 },
        impact : this.impact8
      });
    }
    if(this.company9!=''){
      news.newsImpact.push({
        company : { _id: this.company9},
        impact : this.impact9
      });
    }
    if(this.company10!=''){
      news.newsImpact.push({
        company : { _id: this.company10 },
        impact : this.impact10
      });
    }
    if(this.company11!=''){
      news.newsImpact.push({
        company : { _id: this.company11},
        impact : this.impact11
      });
    }
    if(this.company12!=''){
      news.newsImpact.push({
        company : { _id: this.company12 },
        impact : this.impact12
      });
    }
    if(this.company13!=''){
      news.newsImpact.push({
        company : { _id: this.company13 },
        impact : this.impact13
      });
    }
    if(this.company14!=''){
      news.newsImpact.push({
        company : { _id: this.company14 },
        impact : this.impact14
      });
    }
    if(this.company15!=''){
      news.newsImpact.push({
        company : { _id: this.company15 },
        impact : this.impact15
      });
    }
    if(this.company16!=''){
      news.newsImpact.push({
        company : { _id: this.company16 },
        impact : this.impact16
      });
    }
    if(this.company17!=''){
      news.newsImpact.push({
        company : { _id: this.company17 },
        impact : this.impact17
      });
    }
    if(this.company18!=''){
      news.newsImpact.push({
        company : { _id: this.company18 },
        impact : this.impact18
      });
    }
    if(this.company19!=''){
      news.newsImpact.push({
        company : { _id: this.company19 },
        impact : this.impact19
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
