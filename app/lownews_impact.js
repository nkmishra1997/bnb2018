module.exports = function (cron) {

    var parameters = require('./parameters');
    var company = require('./models/company');
    var mongoose = require('mongoose');
    var news = require('./models/news.js');
  
  
    let companyPriceOnTime = new cron.CronJob({
      cronTime : '*/5 * * * * *',  // The time pattern when you want the job to start
      onTick : changePrice, // Task to run
      onComplete : reset, // When job is completed and It stops.
      start : true, // immediately starts the job.
      timeZone : "Asia/Kolkata" // The timezone
    });

    let number = 0;
    function changePrice() {
        company.find({} , function(err, Company) {
          if (err){
              console.log(err);
            //   res.send("unable to fetch companies");
          }else{
              news.find({}, function(err, News){
                  if (err) {
                      console.log(err);
                    //   res.send("unable to load news");
                  }
                  else{
                    for(var i = 0; i<Company.length; i++){
                        var j=0;
                        // console.log(News[j].flag,"one", Company[i].stockPrice)
                        while(j<News.length){
                        if(News[j].flag=="2"){
                            // console.log(News[j].flag,"sec",News[j].newsImpact[i].impact)
                            // console.log("value of j is",j,"task2")
                        Company[i].stockPrice = (Company[i].stockPrice * (1 + (News[j].newsImpact[i].impact/1000))).toFixed(0);}
                        j++;
                        }

                        Company[i].history.push({
                            timeStamp : Date.now(),
                            stockPrice : Company[i].stockPrice,
                            availableQuantity : Company[i].availableQuantity
                        });
                        Company[i].save();
                    }  
                  }
              });
                                  
          }
        });
    }



    function reset() {
      console.log('Task update Completed');
      number=0;
    }
  
    return companyPriceOnTime;
  
  };

  