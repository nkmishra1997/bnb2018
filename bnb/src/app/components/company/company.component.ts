import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs";
import 'rxjs/add/observable/timer';
import {Subscription} from "rxjs";
import {FlashMessagesService} from 'angular2-flash-messages';

declare var require: any;
declare var Chart:any;
require('./Assets/Chart.bundle.min.js');
require('./Assets/Chart.min.js');
//require('./Assets/chartJs-config.js');
require('../js/jquery-3.2.0.min.js');
require('../js/bootstrap.min.js');
require('../js/preloader.js');
require('../js/script.js');

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ["../css/bootstrap.min.css",
              "../css/font-awesome.min.css",
              "../css/style.css",'./company.component.css']
})
export class CompanyComponent implements OnInit {
company : any;
id : any;
private sub : any;
info : any;
buyForm : FormGroup;
sellForm : FormGroup;
shortForm : FormGroup;
coverForm : FormGroup;
private subscription: Subscription;



  constructor(private companyService : CompanyService,
              private route : ActivatedRoute,
              private formBuilder : FormBuilder,
              private flashMessage:FlashMessagesService
            ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    var ctx = document.querySelector("#statsChart")
    let D:Array<any> = new Array(20);
    var areaChart = null;
    var l;
    for(var i=0;i<20;i++){
      D[i] = 0;
    }
    var data = {
      labels: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"],
      datasets: [
      {
        label: "Stock Price",
        backgroundColor: "rgba(74,73,180,0.8)",
        borderColor: "rgba(74,73,180,0.8)",
        pointBorderColor: "rgb(74,73,180,59)",
        pointBackgroundColor: "rgba(74,73,180,0.8)",
        data: D
      }
      ]
    }
    areaChart = new Chart(ctx, {
      type:"line",
      data:data,

      options: {
        // tooltips: {
        //   mode:"label",
        //   backgroundColor:'rgba(25,25,25,0.9)',
        //   cornerRadius:0,
        //   footerFontFamily:"Montserrat"
        // },
        scaleLineColor: 'transparent',
        elements:{
          point: {
            hitRadius:90
          }
        },

        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              fontFamily: "Arial",
              fontColor:"#586874;"

            }
          }],
          xAxes: [{
            stacked: true,
            gridLines: {
              drawOnChartArea: false
          },
            ticks: {
              fontFamily: "Arial",
              fontColor:"#586874"

            },
          }]
        },
        animation: {
          duration: 1500
        },
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          // mode:"label",
          backgroundColor:'rgba(25,25,25,0.9)',
          cornerRadius:0,
          footerFontFamily:"Montserrat"
        }
      }
    });


    this.subscription = Observable.timer(0,60000)
    .subscribe(() => {
        this.companyService.fetchCompany(this.id).subscribe(Company => {
          this.company = Company
          console.log("company fetched")

          if(areaChart!=null)
            areaChart.destroy()

          l = this.company.history.length;
          for(var j=1;j<=l&&j<21;j++){
            D[20-j] = this.company.history[l-j].stockPrice;
          }
          var data = {
            labels: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"],
            datasets: [
            {
              label: "Stock Price",
              backgroundColor: "rgba(74,73,180,0.8)",
              borderColor: "rgba(74,73,180,0.8)",
              pointBorderColor: "rgb(74,73,180,59)",
              pointBackgroundColor: "rgba(74,73,180,0.8)",
              data: D
            }
            ]
          }
          // if(areaChart !== undefined || areaChart !== null){
          //   areaChart.destroy();
          // }
          areaChart = new Chart(ctx, {
            type:"line",
            data:data,

            options: {
              // tooltips: {
              //   mode:"label",
              //   backgroundColor:'rgba(25,25,25,0.9)',
              //   cornerRadius:0,
              //   footerFontFamily:"Montserrat"
              // },
              scaleLineColor: 'transparent',
              elements:{
                point: {
                  hitRadius:90
                }
              },

              scales: {
                yAxes: [{
                  stacked: true,
                  ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874;"

                  }
                }],
                xAxes: [{
                  stacked: true,
                  gridLines: {
                    drawOnChartArea: false
                },
                  ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874"

                  },
                }]
              },
              animation: {
                duration: 1500
              },
              responsive: true,
              legend: {
                display: false,
              },
              tooltips: {
                // mode:"label",
                backgroundColor:'rgba(25,25,25,0.9)',
                cornerRadius:0,
                footerFontFamily:"Montserrat"
              }
            }
          });
        },
        err => {
          console.log(err)
          return false
        });
      });


    this.buyForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })

    this.sellForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })

    this.shortForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })

    this.coverForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  buyStock(form : any){

    console.log(this.buyForm.value) //for testing only
    // this.clearField()
    this.buyForm.reset();
    this.companyService.buy(this.id,form).subscribe(Info => {
      this.info = Info;
      if(this.info.success){
        this.flashMessage.show(this.info.msg, {cssClass: 'alert-success', timeout: 3000});
      }
      if(!this.info.success){
        this.flashMessage.show(this.info.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
      this.refreshPage();
    },
    err => {
      console.log(err)
      return false
    })
  }

  sellStock(form : any){

    console.log(this.sellForm.value)  //for testing only
    this.sellForm.reset();
    this.companyService.sell(this.id,form).subscribe(Info => {
      this.info = Info;
      if(this.info.success){
        this.flashMessage.show(this.info.msg, {cssClass: 'alert-success', timeout: 3000});
      }
      if(!this.info.success){
        this.flashMessage.show(this.info.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
      this.refreshPage();
    },
    err => {
      console.log(err)
      return false
    })
  }

  shortStock(form : any){

    console.log(this.shortForm.value) //for testing only
    this.shortForm.reset();
    this.companyService.short(this.id,form).subscribe(Info => {
      this.info = Info;
      if(this.info.success){
        this.flashMessage.show(this.info.msg, {cssClass: 'alert-success', timeout: 3000});
      }
      if(!this.info.success){
        this.flashMessage.show(this.info.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
      this.refreshPage();
    },
    err => {
      console.log(err)
      return false
    })
  }

  coverStock(form : any){

    console.log(this.coverForm.value) //for testing only
    this.coverForm.reset();
    this.companyService.cover(this.id,form).subscribe(Info => {
      this.info = Info;
      if(this.info.success){
        this.flashMessage.show(this.info.msg, {cssClass: 'alert-success', timeout: 3000});
      }
      if(!this.info.success){
        this.flashMessage.show(this.info.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
      this.refreshPage();

    },
    err => {
      console.log(err)
      return false
    })
  }

  refreshPage() {
    console.log("Inside RefreshPage()");
    this.companyService.fetchCompany(this.id).subscribe(Company => {
      this.company = Company
    },
    err => {
      console.log(err)
      return false
    });
  }
}
