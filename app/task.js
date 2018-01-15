module.exports = function (cron) {

  var parameters = require('./parameters');
  var company = require('./models/company');
  var mongoose = require('mongoose');


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
            res.send("unable to fetch companies");
        }else{
            for(var i = 0; i<Company.length; i++){
                rand = (Math.random() * (1 - (-1)) + (-1)).toFixed(3)
                Company.stockPrice = Company.stockPrice * (1 + (parameters.controlUpdate3*rand));
                // Company.history.push({
                //     timeStamp : Date.now(),
                //     stockPrice : Company.stockPrice,
                //     availableQuantity : Company.availableQuantity
                // });
                console.log(Company, rand);
                // Company.save();
                console.log("working fine");
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