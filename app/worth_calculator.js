module.exports = function (cron) {
	var mongoose = require('mongoose');
    var parameters = require('./parameters');
    var company = require('./models/company');
	var customer = require('./models/customer.js');

    let customerWorth = new cron.CronJob({
      cronTime : '* * * * *',  // The time pattern when you want the job to start
      onTick : calculateWorth, // Task to run
      onComplete : reset, // When job is completed and It stops.
      start : true, // immediately starts the job.
      timeZone : "Asia/Kolkata" // The timezone
    });
    function calculateWorth() {
		customer.find({})
		.populate('portfolio.company')
		.then(customerlist=> {
			customerlist.map((customer)=>{
			var stockHoldingAmount = 0
			var stockShortedAmount = 0
			customer.portfolio.forEach((element)=>{
				stockHoldingAmount += element.company.stockPrice * element.stockHeld
				stockShortedAmount += element.company.stockPrice * element.stockShorted
			})
			customer.worth = customer.accountBalance + stockHoldingAmount - stockShortedAmount - customer.loan.amount
			customer.save()
		})
		console.log('worth calculated')
	}).catch(err=>{
          console.log(err)
        });
	}

    function reset() {
      console.log('Task worth Completed');
      number=0;
    }

    return customerWorth;

  };