var mongoose = require('mongoose')
var company = require('./models/company');
var customer = require('./models/customer');
var news = require('./models/news');
var parameters = require('./parameters.js')
mongoose.Promise = global.Promise;




// ============================================================================
// Stock Market ===============================================================
// ============================================================================

exports.companyList = function(req, res){
  company.find({}).then(companies=>{
    var accountBal = {'accountBalance' : req.user.accountBalance}
    res.json(companies)
  })
  .catch(err=>{
    console.log(err)
		res.send("unable to fetch company list")
  })
}


exports.companyDetails = function(req, res){
  company.findById(req.params.id).then((compDetails)=>{
    customer.findById(req.user._id).then(Customer=>{
      var accountBalance = Customer.accountBalance
      var buyMax = Math.min((accountBalance/company.stockPrice),company.availableQuantity)
      var sellMax = Math.min((accountBalance/company.stockPrice),(company.totalQuantity-company.availableQuantity))
      var shortMax = parameters.shortMax
      var coverMax = Math.min((accountBalance/company.stockPrice),shortMax)

      var details = {
        compDetails : compDetails,
        accountBalance : accountBalance,
        buyMax : buyMax,
        sellMax : sellMax,
        shortMax : shortMax,
        coverMax : coverMax
      }
      res.json(details)

    }).catch(err=>{
      console.log(err)
      res.send("unable to fetch customer from request")
    })
  }).catch(err=>{
    console.log(err)
    res.send("unable to fetch company details")
  })
}


exports.newsDetails = function(req, res) {    //yet to be tested
  news
  .findById(req.params.id)
  .populate('newsImpact.Company')
  .then(newsDetails=>{
    res.json(newsDetails)
  }).catch(err=>{
    console.log(err)
  	res.send("unable to fetch news details")
  })
}


exports.newsList = function(req, res){
  news.find({}).then(newslist=>{
    res.json(newslist)
  }).catch(err=>{
    console.log(err);
		res.send("unable to fetch news list")
  })
}

// ============================================================================
// Customer ===================================================================
// ============================================================================


exports.customerDetail = function(req, res) {
  customer
  .findById(req.user._id)
  .populate('stockHoldings.company')
  .populate('stockShorted.company')
  .then(Customer=>{

		//evaluate the worth of customer
    var stockHoldingAmount = 0
    Customer.stockHoldings.forEach((element)=>{
      stockHoldingAmount += element.company.stockPrice * element.quantity
    })
    var stockShortedAmount = 0
    Customer.stockShorted.forEach((element)=>{
      stockShortedAmount += element.company.stockPrice * element.quantity
    })
		var worth = { 'worth' : Customer.accountBalance + stockHoldingAmount - stockShortedAmount - Customer.loan.amount }

    var player = {
      Customer : Customer,
      worth : worth
    }
    res.json(player)

  }).catch(err=>{
    console.log(err)
  	res.send("unable to fetch customer details")
  })
}


exports.customerList = function(req, res) {
  customer.find({}).then(customerlist=> {
	   res.json(customerlist)
  }).catch(err=>{
    console.log(err)
    res.send("unable to fetch customer list")
  })
}


exports.buy = function(req, res){
    company.findById(req.params.id).then(Company=>{
      customer
      .findById(req.user._id)
      .populate('stockHoldings.company')
      .populate('activity.company')
      .then(Customer=>{

        console.log(req.body) //for testing only

            var flag = 0
            var stock = req.body.amount
            for(var i=0;i<Customer.stockHoldings.length;i++){
              if(Customer.stockHoldings[i].company._id === Company._id ){
                Customer.stockHoldings[i].quantity += stock
                Customer.accountBalance -= stock * Company.stockPrice
                Company.availableQuantity -= stock
                Company.history.push({timeStamp : Date.now(), stockPrice : Company.stockPrice, availableQuantity : Company.availableQuantity})
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'bought', quantity:stock, price:Company.stockPrice})
                flag = 1
              }
            }
            if(flag === 0){
                Company.availableQuantity -= stock
                Company.history.push({timeStamp : Date.now(), stockPrice : Company.stockPrice, availableQuantity : Company.availableQuantity})
                Customer.accountBalance -= stock * Company.stockPrice
                Customer.stockHoldings.push({company : Company._id, quantity : stock})
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'bought', quantity:stock, price:Company.stockPrice})
            }
            Customer.save()
            Company.save()
            res.json({'success':true, Company, Customer})

      }).catch(err=>{
        console.log(err)
        res.send('unable to fetch user')
      })
    }).catch(err=>{
      console.log(err)
    	res.send("unable to fetch company")
    })
}


exports.sell = function(req, res){
    company.findById(req.params.id).then(Company=>{
      customer
      .findById(req.user._id)
      .populate('stockHoldings.company')
      .populate('activity.company')
      .then(Customer=>{

        console.log(req.body) //for testing only

            var flag = 0
            var stock = req.body.amount
            for(var i=0;i<Customer.stockHoldings.length;i++){
              if(Customer.stockHoldings[i].company._id === Company._id ){
                Customer.stockHoldings[i].quantity -= stock
                Customer.accountBalance += stock * Company.stockPrice
                Company.availableQuantity += stock
                Company.history.push({timeStamp : Date.now(), stockPrice : Company.stockPrice, availableQuantity : Company.availableQuantity})
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'sold', quantity:stock, price:Company.stockPrice})
                flag = 1
              }
            }
            if(flag === 0){
                Company.availableQuantity += stock
                Company.history.push({timeStamp : Date.now(), stockPrice : Company.stockPrice, availableQuantity : Company.availableQuantity})
                Customer.accountBalance += stock * Company.stockPrice
                Customer.stockHoldings.push({company : Company._id, quantity : stock})
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'sold', quantity:stock, price:Company.stockPrice})
            }
            Customer.save()
            Company.save()
            res.json({'success':true, Company, Customer})

      }).catch(err=>{
        console.log(err)
        res.send('unable to fetch user')
      })
    }).catch(err=>{
      console.log(err)
    	res.send("unable to fetch company")
    })
}


exports.short = function(req, res){
    company.findById(req.params.id).then(Company=>{
      customer
      .findById(req.user._id)
      .populate('stockShorted.company')
      .populate('activity.company')
      .then(Customer=>{
            var flag = 0
            var stock = req.body.amount
            for(var i=0;i<Customer.stockShorted.length;i++){
              if(Customer.stockShorted[i].company._id === Company._id ){
                Customer.stockShorted[i].quantity += stock
                Customer.accountBalance += stock * Company.stockPrice
                Company.availableQuantity -= stock
                Company.history.push({timeStamp : Date.now(), stockPrice : Company.stockPrice, availableQuantity : Company.availableQuantity})
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'shorted', quantity:stock, price:Company.stockPrice})
                flag = 1
              }
            }
            if(flag === 0){
                Company.availableQuantity -= stock
                Company.history.push({timeStamp : Date.now(), stockPrice : Company.stockPrice, availableQuantity : Company.availableQuantity})
                Customer.accountBalance += stock * Company.stockPrice
                Customer.stockShorted.push({company : Company._id, quantity : stock})
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'shorted', quantity:stock, price:Company.stockPrice})
            }
            Customer.save()
            Company.save()
            res.json({'success':true, Company, Customer})

      }).catch(err=>{
        console.log(err)
        res.send('unable to fetch user')
      })
    }).catch(err=>{
      console.log(err)
    	res.send("unable to fetch company")
    })
}


exports.cover = function(req, res){
    company.findById(req.params.id).then(Company=>{
      customer
      .findById(req.user._id)
      .populate('stockShorted.company')
      .populate('activity.company')
      .then(Customer=>{
            var flag = 0
            var stock = req.body.amount
            for(var i=0;i<Customer.stockShorted.length;i++){
              if(Customer.stockShorted[i].company._id === Company._id ){
                Customer.stockShorted[i].quantity -= stock
                Customer.accountBalance -= stock * Company.stockPrice
                Company.availableQuantity += stock
                Company.history.push({timeStamp : Date.now(), stockPrice : Company.stockPrice, availableQuantity : Company.availableQuantity})
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'covered', quantity:stock, price:Company.stockPrice})
                flag = 1
              }
            }
            if(flag === 0){
                Company.availableQuantity += stock
                Company.history.push({timeStamp : Date.now(), stockPrice : Company.stockPrice, availableQuantity : Company.availableQuantity})
                Customer.accountBalance -= stock * Company.stockPrice
                Customer.stockShorted.push({company : Company._id, quantity : stock})
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'covered', quantity:stock, price:Company.stockPrice})
            }
            Customer.save()
            Company.save()
            res.json({'success':true, Company, Customer})

      }).catch(err=>{
        console.log(err)
        res.send('unable to fetch user')
      })
    }).catch(err=>{
      console.log(err)
    	res.send("unable to fetch company")
    })
}


exports.takeLoan = function(req, res){
    customer
    .findById(req.user._id)
    .then(Customer=>{

        var amount = parameters.loanAmount
          if(Customer.loan.taken === true){
            res.send('Please repay the loan')
          }
          else{
            Customer.loan.taken = true
            Customer.loan.amount = amount
            Customer.loan.takeOutTime = Date.now()
            Customer.accountBalance += amount
          }
          Customer.save()
          res.json(Customer)

    }).catch(err=>{
      console.log(err)
      res.send('unable to fetch user')
    })
}


exports.repayLoan = function(req, res){
    customer
    .findById(req.user._id)
    .then(Customer=>{

        var amount = parameters.loanAmount
          if(Customer.loan.taken === false){
            res.send('Please loan some money first')
          }
          else{
            Customer.loan.taken = false
            Customer.loan.amount = 0
            Customer.loan.takeOutTime = Date.now()
            Customer.accountBalance -= amount
          }
          Customer.save()
          res.json(Customer)

    }).catch(err=>{
      console.log(err)
      res.send('unable to fetch user')
    })
}

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
    })

    newCompany.save().then(company=>{
      res.json({success:true,msg:'Company saved successfully'})
    }).catch(err=>{
      res.json({success:false,msg:'Company Not saved'})
    })
}


exports.modifyCompany = function(req, res){
    company.findById(req.params.id).then(Company=>{

            Company.name= req.body.name
            Company.symbol= req.body.symbol
            Company.description= req.body.description
            Company.stockPrice= req.body.stockPrice
            Company.availableQuantity= req.body.availableQuantity
            Company.totalQuantity= req.body.totalQuantity
            Company.annualGrowthRate= req.body.annualGrowthRate
            Company.marketcap= req.body.marketcap

            Company.save().then(Company=>{

                  res.json({success:true, msg:"Company details updated successfully"})

            }).catch(err=>{
              res.json({success:false, msg:"Company details not updated"})
            })
    }).catch(err=>{
      throw err
    })
}


exports.deleteCompany = function(req, res){
    company.findByIdAndRemove(req.params.id).then(Company=>{
          res.json({success: true, msg:"Company deleted successfully"})
    }).catch(err=>{
      res.json({success: false, msg:"Company not deleted"})
    })
}


exports.addNews = function(req, res){
    const newNews = new news({
      newsText : req.body.newsText,
      youtubeSrc : req.body.youtubeSrc,
      isPublished : req.body.isPublished,
      publishedOn: Date.now(),
      newsImpact : req.body.newsImpact
    })
    newNews.save().then(news=>{

          res.json({success:true,msg:'News saved successfully'});

    }).catch(err=>{
        res.json({success:false,msg:'News Not saved'})
    })
}


exports.modifyNews = function(req, res){
    news.findById(req.params.id).then(News=>{

          News.newsText = req.body.newsText
          News.youtubeSrc = req.body.youtubeSrc
          News.isPublished = req.body.isPublished
          News.newsImpact.company = req.body.newsImpact.company
          News.newsImpact.impact = req.body.newsImpact.impact
          News.save().then(news=>{

                res.json({success:true, msg:"News details updated successfully"})
            }).catch(err=>{
                res.json({success:false, msg:"News details not updated"})
            })
    }).catch(err=>{
      throw err
    })
}


exports.deleteNews = function(req, res){
    news.findByIdAndRemove(req.params.id).then(News=>{
        res.json({success: true, msg:"News deleted successfully"})
    }).catch(err=>{
      res.json({success: false, msg:"News not deleted"})
    })
}


exports.modifyUser = function(req, res){
    customer.findById(req.params.id).then(Customer=>{

            ban = req.body.ban
            admin = req.body.admin
            accountBalance = req.body.accountBalance
            loan.taken = req.body.loan.taken
            loan.amount = req.body.loan.amount

            Customer.save().then(user=>{
                res.json({success: true, msg:"User modified successfully"});
            }).catch(err=>{
              res.json({success: false, msg:"User not modified"})
            })
    }).catch(err=>{
      throw err
    })
}


exports.deleteUser = function(req, res){
    customer.findByIdAndRemove(req.params.id).then(User=>{
          res.json({success: true, msg:"User deleted successfully"})
    }).catch(err=>{
      res.json({success: false, msg:"User not deleted"})
    })
}
