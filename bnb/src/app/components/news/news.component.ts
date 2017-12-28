import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

declare var require: any;
require('../js/jquery-3.2.0.min.js');
require('../js/bootstrap.min.js');
require('../js/preloader.js');
require('../js/script.js');

@Component({
  selector: 'app-market',
  templateUrl: './news.component.html',
  styleUrls: ["../css/bootstrap.min.css",
              "../css/font-awesome.min.css",
              "../css/style.css",
              './news.component.css'
  ]
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
