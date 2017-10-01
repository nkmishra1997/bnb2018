import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news : any;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newsService.fetchNews().subscribe(News => {
      this.news = News;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
