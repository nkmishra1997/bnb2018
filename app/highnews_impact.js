module.exports = function (cron) {

    var parameters = require('./parameters');
    var company = require('./models/company');
    var mongoose = require('mongoose');
    var news = require('./models/news.js');
  
  
    let companyPriceOnTime = new cron.CronJob({
      cronTime : '*/12 * * * * *',  // The time pattern when you want the job to start
      onTick : changePrice, // Task to run
      onComplete : reset, // When job is completed and It stops.
      start : true, // immediately starts the job.
      timeZone : "Asia/Kolkata" // The timezone
    });

    let number = 0;
    function changePrice() {
        news.find({} , function(err, News) {
          if (err){
              console.log(err||(News.length==0));
            //   res.send("unable to fetch news");
          }else{
              var k=0;
              var i=0;
            //   console.log(News[k].newsImpact.length);
            
              while((k<News.length)&&(News[k].newsImpact.length>0)){
                  while(i<News[k].newsImpact.length){
              company.findById( News[k].newsImpact[i].company , function(err, Company){
                console.log(Company.name, k);
                  if (err) {
                      console.log(err);
                    //   res.send("unable to load company");
                  }
                  else{

                //     for(var i = 0; i<Company.length; i++){
                //         var j=0;
                //         // console.log(News[j].flag,"one", Company[i].stockPrice)
                //         while(j<News.length){
                //         if(News[j].flag=="1"){
                //             // console.log(News[j].flag,"sec",News[j].newsImpact[i].impact)
                //             // console.log("value of j is",j)
                //         console.log(Company);
                //         // Company[i].stockPrice = (Company[i].stockPrice * (1 + (News[j].newsImpact[i].impact/parameters.stockParameter))).toFixed(0);
                //         // Company[i].annualGrowthRate = ((((Company[i].history[Company[i].history.length - 1].stockPrice-Company[i].stockPrice)/Company[i].stockPrice))*100).toFixed(2);
                //         // console.log("growth rate is",Company[i].annualGrowthRate);
                //         // console.log("change in price by newsimpact",News[j].newsImpact[i].impact,"of",j,"news","in company",Company[i].symbol,"is",Company[i].stockPrice);}
                //         j++;
                //         }

                //         Company[i].history.push({
                //             timeStamp : Date.now(),
                //             stockPrice : Company[i].stockPrice,
                //             availableQuantity : Company[i].availableQuantity
                //         });
                //         Company[i].save();
                //     }  
                //   }
                }
              });
              i++;
            }
            k++;
          }
        }
        });
    }



    function reset() {
      console.log('Task update Completed');
      number=0;
    }
  
    return companyPriceOnTime;
  
  };

  