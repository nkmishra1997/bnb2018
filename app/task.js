module.exports = function (cron) {

  var parameters = require('./parameters');
  var company = require('./models/company');
  var mongoose = require('mongoose');


  let companyPriceOnTime = new cron.CronJob({
    cronTime : '* */5 * * * *',  // The time pattern when you want the job to start
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
                rand = (Math.random() * (2) + (-1)).toFixed(0);
                rand=parseFloat(rand);
                Company[i].stockPrice = (Company[i].stockPrice * (1 + (rand/10))).toFixed(0);
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
  function reset() {
    console.log('Task update Completed');
    number=0;
  }

  return companyPriceOnTime;

};