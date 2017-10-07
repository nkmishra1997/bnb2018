import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  newsText : String;
  youtubeSrc : String;
  isPublished : Boolean;
  newsImpact : Object;
  company: String;
  impact: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onNewsSubmit(){
  const news = {
    newsText : this.newsText,
    youtubeSrc : this.youtubeSrc,
    isPublished : this.isPublished,
    newsImpact : {
      company : this.company,
      impact : this.impact
    }
  }

  /*this.authService.addNews(news).subscribe(data => {
      if(data.success){
        console.log("saved");
        this.router.navigate(['/admin/news']);
      }
      else{
        console.log('not saved');
        this.router.navigate(['/admin/addnews']);
      }
  });*/
  }

}
