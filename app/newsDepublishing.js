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
    function changePrice() {news.find({}, function(err, News){
    
        if (err||(News.length==0)) {
            console.log(err);
            // res.send("unable to load news");
        }
        else{ 
            var k=0;
            var l;
          while(k!=News.length-1) {
            l=k;
          if(News[k].flag=="3"){
          k++;}
          if(k==l){break;}}
                if((k<News.length)&&(News[k].flag=="2")){
                News[k].flag="3";
                // console.log("change in",k)
                console.log("news not available is",k);
                News[k].save();
                if(k<News.length-1){k++};
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