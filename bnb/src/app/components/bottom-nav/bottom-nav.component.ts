import { Component, OnInit } from '@angular/core';

// declare var require: any;
// require('../js/jquery-3.2.0.min.js');
// require('../js/bootstrap.min.js');
// require('../js/preloader.js');
// require('../js/script.js');

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: [
    "../css/bootstrap.min.css",
              "../css/font-awesome.min.css",
              "../css/style.css",
    './bottom-nav.component.css'
  ]
})
export class BottomNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
