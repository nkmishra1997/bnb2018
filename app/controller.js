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

//************************************************************************
//Admin Related Functions
//************************************************************************

exports.addCompany = function(req, res){
    const newCompany = new company({
        name: req.body.name,
        symbol: req.body.symbol,
        description: req.body.description,
        stockPrice: req.body.stockPrice,
        availableQuantity: req.body.availableQuantity,
        totalQuantity: req.body.totalQuantity,
        annualGrowthRate: req.body.annualGrowthRate,
        marketcap: req.body.marketcap
    });
    /*company.findOne({name: newCompany.name}, function(err, company){
        if(err){
            throw err;
        }
        if(company){
            res.json({success:false,msg:'Company exists'});
        }
        else{*/
            newCompany.save(function(err,company){
                if(err){
                    res.json({success:false,msg:'Company Not saved'});
                }
                else{
                    res.json({success:true,msg:'Company saved successfully'});
                }
            });
        //}  
    //});
};

exports.modifyCompany = function(req, res){
    company.findById(req.params.id, function(err, Company){
        if(err){
            throw err;
        }
        if(Company){
            Company.name= req.body.name;
            Company.symbol= req.body.symbol;
            Company.description= req.body.description;
            Company.stockPrice= req.body.stockPrice;
            Company.availableQuantity= req.body.availableQuantity;
            Company.totalQuantity= req.body.totalQuantity;
            Company.annualGrowthRate= req.body.annualGrowthRate;
            Company.marketcap= req.body.marketcap;
            Company.save(function(err, company){
                if(err){
                    res.json({success:false, msg:"Company details not updated"});
                }
                else{
                    res.json({success:true, msg:"Company details updated successfully"});
                }
            });
        }
    });
};

exports.deleteCompany = function(req, res){
    company.findByIdAndRemove(req.params.id, function(err, Company){
        if(err){
            res.json({success: false, msg:"Company not deleted"});
        }
        else{
            res.json({success: true, msg:"Company deleted successfully"});
        }
    });
};

exports.addNews = function(req, res){
    const newNews = new news({
      newsText : req.body.newsText,
      youtubeSrc : req.body.youtubeSrc,
      isPublished : req.body.isPublished,
      newsImpact : req.body.newsImpact
    });
    /*news.findOne({newsText: newNews.newsText}, function(err, news){
        if(err){
            throw err;
        }
        if(news){
            res.json({success:false, msg:"News exists"});
        }
        else{*/
            newNews.save(function(err,news){
                if(err){
                    res.json({success:false,msg:'News Not saved'});
                }
                newNews.on('index', function(err){ console.log(err);});
                res.json({success:true,msg:'News saved successfully'});
            });
        }
    //});
//};

exports.modifyNews = function(req, res){
    news.findById(req.params.id, function(err, News){
        if(err){
            throw err;
        }
        if(News){
            News.newsText = req.body.newsText;
            News.youtubeSrc = req.body.youtubeSrc;
            News.isPublished = req.body.isPublished;
            News.newsImpact.company = req.body.newsImpact.company;
            News.newsImpact.impact = req.body.newsImpact.impact;
            News.save(function(err, news){
                if(err){
                    res.json({success:false, msg:"News details not updated"});
                }
                else{
                    res.json({success:true, msg:"News details updated successfully"});
                }    
            });
        }   
    });
};

exports.deleteNews = function(req, res){
    news.findByIdAndRemove(req.params.id, function(err, News){
        if(err){
            res.json({success: false, msg:"News not deleted"});
        }
        else{
            res.json({success: true, msg:"News deleted successfully"});
        }
    });
};

exports.modifyUser = function(req, res){
    customer.findById(req.params.id, function(err, Customer){
        if(err){
            throw err;
        }
        if(Customer){
            ban = req.body.ban;
            admin = req.body.admin;
            accountBalance = req.body.accountBalance;
            loan.taken = req.body.loan.taken;
            loan.amount = req.body.loan.amount;
            Customer.save(function(err, user){
                if(err){
                    res.json({success: false, msg:"User not modified"});
                }
                else{
                    res.json({success: true, msg:"User modified successfully"});
                }
            });
        }
    });
};

exports.deleteUser = function(req, res){
    customer.findByIdAndRemove(req.params.id, function(err, User){
        if(err){
            res.json({success: false, msg:"User not deleted"});
        }
        else{
            res.json({success: true, msg:"User deleted successfully"});
        }
    });
};