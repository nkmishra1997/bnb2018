module.exports = function (cron) {

    var mongoose = require('mongoose')
    var company = require('./models/company');
    var customer = require('./models/customer');
    var news = require('./models/news');
    var parameters = require('./parameters.js');
    mongoose.Promise = global.Promise;
    
  
    let companyPriceOnTime = new cron.CronJob({
      cronTime : '*/15 * * * *',  // The time pattern when you want the job to start
      onTick : changePrice, // Task to run
      onComplete : reset, // When job is completed and It stops.
      start : true, // immediately starts the job.
      timeZone : "Asia/Kolkata" // The timezone
    });
  
    var number = 0;
    function changePrice() {
        news.find({}, function(err, News){
            if (err||(News.length==0)) {
                console.log(err);
                // res.send("unable to load news");
            }
            else{ 
                var l=0;
                var k;
                 while(l!=News.length-1){ 
                     k=l;
                    if((News[l].flag=="1")||(News[l].flag=="2")||(News[l].flag=='3')){
                      l++;}
                    if(l==k){break;}}
                          if((l<News.length)&&(News[l].flag=="0")){
                          News[l].flag="1";
                          News[l].publishedOn = Date.now();
                          console.log(News.publishedOn);
                          // console.log("change in",k)
                          console.log("news available is",l);
                          News[l].save();
                          if(l<News.length-1){l++;}
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