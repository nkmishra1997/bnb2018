import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  news : any;
  id : string;
  private sub:any;

  newsText : String;
  youtubeSrc : String;
  isPublished : Boolean;
  newsImpact :{
    company: String;
    impact: String;
  }

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });

    this.adminService.getNewsDetail(this.id).subscribe(News => {
      this.news = News;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onSubmit(){
    const news = {
    newsText : this.newsText,
    youtubeSrc : this.youtubeSrc,
    isPublished : this.isPublished,
    newsImpact : {
      company : this.newsImpact.company,
      impact : this.newsImpact.impact
    }
  }

  this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
  });
  /*this.authService.addModifiedNews(this.id, news).subscribe(data => {
      if(data.success){
        console.log("News Modified");
        this.router.navigate(['/admin/news']);
      }
      else{
        console.log('News not Modified');
        this.router.navigate(['/admin/newsdetail/', this.id]);
      }
  });*/
  }
}
