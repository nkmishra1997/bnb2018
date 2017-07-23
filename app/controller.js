var mongoose = require('mongoose')
var company = require('./models/company');
var customer = require('./models/customer');
var news = require('./models/news');
var parameters = require('./parameters')
mongoose.Promise = global.Promise;



// ============================================================================
// Stock Market ===============================================================
// ============================================================================

exports.companyList = function(req, res) {
  company.find({}, function(err, companies) {
    if (err){
		console.log(err);
		res.send("unable to fetch company list");
	}else {
		var accountBal = {'accountBalance' : req.user.accountBalance}
		companies.push(accountBal);
		res.json(companies);
	}
  });
};


exports.companyDetails = function(req, res) {
  company.findById(req.params.id, function(err, compDetails) {
    if (err){
		console.log(err);
		res.send("unable to fetch company details");
	}else {
		customer.findById(req.user._id, function(err, Customer) {
            
            if (err){
                console.log(err);
                res.send("unable to fetch customer from request");
            }else {
                //Write the code here to get details of company
				// max quantity user can buy,sell,short,cover
				//his account balance
				// sample response
                //res.json({compDetails,accountBalance, buyMax, sellMax, shortMax , coverMax});
            }
        });
	}
  });
};

exports.newsList = function(req, res) {
  news.find({}, function(err, newslist) {
    if (err){
		console.log(err);
		res.send("unable to fetch news list");
	}else {
		res.json({newslist});
	}
  });
};





// ============================================================================
// Customer ===================================================================
// ============================================================================


exports.customerDetail = function(req, res) {
  customer
  .findById(req.user._id)
  .populate('stockHoldings.company')
  .populate('stockShorted.company')
  .exec(function(err, Customer) {
    if (err){
		console.log(err);
		res.send("unable to fetch customer details");
	}else {
		//evaluate the worth of customer using given formula
		//var worth = Customer.accountBalance + stocksHeldAmount - stockShortedAmount - Customer.loan.amount;
        // console.log(worth, portfolio);
		res.json(Customer);
	}
  });
};

exports.customerList = function(req, res) {
  customer.find({}, function(err, customerlist) {
    if (err){
		console.log(err);
		res.send("unable to fetch company list");
	}else {
		res.json(customerlist);
	}
  });
};


exports.buy = function(req, res){
    company.findById(req.params.id, function(err, Company) {
    if (err){
		console.log(err);
		res.send("unable to fetch company");
	}else {
        customer
        .findById(req.user._id)
        .populate('stockHoldings.company')
        .populate('activity.company')
        .exec(function(err, Customer){
            // console.log(Customer);
            if(err){
                console.log(err);
                res.send('unable to fetch user')
            }
            res.json({'success':true});
        })
	}
  });
}

exports.sell = function(req, res){
    company.findById(req.params.id, function(err, Company) {
    if (err){
		console.log(err);
		res.send("unable to fetch company");
	}else {
        customer
        .findById(req.user._id)
        .exec(function(err, Customer){
            if(err){
                console.log(err);
                res.send('unable to fetch user')
            }
            //quantity = req.body.quantity;
            res.json({'success':true}); 
    	 })
	}
  });
}


exports.short = function(req, res){
    company.findById(req.params.id, function(err, Company) {
    if (err){
		console.log(err);
		res.send("unable to fetch company");
	}else {
        customer
        .findById(req.user._id)
        .exec(function(err, Customer){
            // console.log(Customer);
            if(err){
                console.log(err);
                res.send('unable to fetch user')
            }
            //quantity = req.body.quantity;
            res.json({'success':true});
        })
	}
  });
}

exports.cover = function(req, res){
    company.findById(req.params.id, function(err, Company) {
    if (err){
		console.log(err);
		res.send("unable to fetch company");
	}else {
        customer
        .findById(req.user._id)
        .exec(function(err, Customer){
            // console.log(Customer);
            if(err){
                console.log(err);
                res.send('unable to fetch user');
            }
            //quantity = req.body.quantity;
            res.json({'success':true});

        });
	};
  });
};


exports.takeLoan = function(req, res){
    customer
    .findById(req.user._id)
    .exec(function(err, Customer){
        if(err){
            console.log(err);
            res.send('unable to fetch user')
        }
        //COde here
    });
};

exports.repayLoan = function(req, res){
    customer
    .findById(req.user._id)
    .exec(function(err, Customer){
        if(err){
            console.log(err);
            res.send('unable to fetch user')
        }
        //code here
    });
};