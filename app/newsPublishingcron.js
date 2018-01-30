module.exports = function (cron) {

    var parameters = require('./parameters');
    var company = require('./models/company');
    var mongoose = require('mongoose');
  
    let companyPriceOnTime = new cron.CronJob({
      cronTime : '* */10 * * * *',  // The time pattern when you want the job to start
      onTick : changePrice, // Task to run
      onComplete : reset, // When job is completed and It stops.
      start : true, // immediately starts the job.
      timeZone : "Asia/Kolkata" // The timezone
    });
  
    var number = 0;
    function changePrice() {
        company.find({} , function(err, Company) {
          if (err){
              console.log(err);
              res.send("unable to fetch companies");
          }else{
            var k=0;
            while(News[k].flag=="2") {
            if(k!=News.length-1){
            k++;}}
                  if((k<News.length)&&(News[k].flag=="1")){
                  News[k].flag="2";
                  // console.log("change in",k)
                  console.log("news not available is",k);
                  News[k].save();
                  k++;}
      
          }
        });
    }
    function reset() {
      console.log('Task update Completed');
      number=0;
    }
  
    return companyPriceOnTime;
  
  };