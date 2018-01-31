module.exports = function (cron) {

    var mongoose = require('mongoose')
    var company = require('./models/company');
    var customer = require('./models/customer');
    var news = require('./models/news');
    var parameters = require('./parameters.js');
    mongoose.Promise = global.Promise;
    
  
    let companyPriceOnTime = new cron.CronJob({
      cronTime : '*/6 * * * * *',  // The time pattern when you want the job to start
      onTick : changePrice, // Task to run
      onComplete : reset, // When job is completed and It stops.
      start : true, // immediately starts the job.
      timeZone : "Asia/Kolkata" // The timezone
    });
  
    var number = 0;
    function changePrice() {
        news.find({}, function(err, News){
        
            if (err) {
                console.log(err);
                res.send("unable to load news");
            }
            else{ 
                var l=0;
        
                 while((News[l].flag=="1")||(News[l].flag=="2")){ 
                    if(l!=News.length-1){
                      l++;}}
                          if((l<News.length)&&(News[l].flag=="0")){
                          News[l].flag="1";
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