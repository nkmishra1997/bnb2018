var mongoose = require('mongoose')
var company = require('./models/company');
var customer = require('./models/customer');
var news = require('./models/news');
var parameters = require('./parameters.js');
var CronJob = require('cron').CronJob;
mongoose.Promise = global.Promise;



// ============================================================================
// Stock Market ===============================================================
// ============================================================================

exports.companyList = function(req, res){
  company.find({}).then(companies=>{
    //var accountBal = {'accountBalance' : req.user.accountBalance}
    var companylist = []
    companies.forEach((element)=>{
      var company = {
        id: element._id,
        symbol: element.symbol,
        name: element.name,
        stockPrice: element.stockPrice,
        annualGrowthRate: element.annualGrowthRate,
        availableQuantity: element.availableQuantity
      }
      companylist.push(company)
    })
    res.json(companylist)
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
      var buyMax = Math.min(Math.floor(accountBalance/compDetails.stockPrice),compDetails.availableQuantity)
      var sellMax = Math.min(Math.floor(accountBalance/compDetails.stockPrice),(compDetails.totalQuantity-compDetails.availableQuantity))
      var shortMax = parameters.shortMax
      var coverMax = Math.min(Math.floor(accountBalance/compDetails.stockPrice),shortMax)

      var details = {
        name: compDetails.name,
        stockPrice: compDetails.stockPrice,
        availableQuantity: compDetails.availableQuantity,
        marketcap: compDetails.marketcap,
        annualGrowthRate: compDetails.annualGrowthRate,
        history: compDetails.history,
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


exports.newsDetails = function(req, res) {    //what is the use?
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
    var news = []
    newslist.forEach((element)=>{
      if(element.isPublished){
        news.push(element)
      }
    })
    res.json(news)
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
  .populate('portfolio.company')
  .populate('activity.company')
  .then(Customer => {

		//evaluate the worth of customer
    var stockHoldingAmount = 0
    var stockShortedAmount = 0
    Customer.portfolio.forEach((element)=>{
      stockHoldingAmount += element.company.stockPrice * element.stockHeld
      stockShortedAmount += element.company.stockPrice * element.stockShorted
    })
		var worth = { 'worth' : Customer.accountBalance + stockHoldingAmount - stockShortedAmount - Customer.loan.amount }

    var player = {
      name : Customer.facebook.name,
      id: Customer.facebook.id,
      accountBalance: Customer.accountBalance,
      loan: Customer.loan.amount,
      portfolio: Customer.portfolio,
      activity: Customer.activity,
      worth : worth
    }
    res.json(player)

  }).catch(err=>{
    console.log(err)
  	res.send("unable to fetch customer details")
  })
}


exports.customerList = function(req, res) {
  customer.find({})
  .populate('portfolio.company')
  .populate('activity.company')
  .then(customerlist=> {
    var playerList = []
     customerlist.map((customer)=>{
       var stockHoldingAmount = 0
       var stockShortedAmount = 0
       customer.portfolio.forEach((element)=>{
         stockHoldingAmount += element.company.stockPrice * element.stockHeld
         stockShortedAmount += element.company.stockPrice * element.stockShorted
       })
   		var worth = { 'worth' : customer.accountBalance + stockHoldingAmount - stockShortedAmount - customer.loan.amount }

       var player = {
         name : customer.facebook.name,
         id : customer.facebook.id,
         worth : worth
       }
       playerList.push(player)
     })

    playerList.sort(function(a,b){
      return b.worth.worth - a.worth.worth
    })

    res.json(playerList)

  }).catch(err=>{
    console.log(err)
    res.send("unable to fetch customer list")
  })
}


exports.buy = function(req, res){
    company.findById(req.params.id).then(Company=>{
      customer.findById(req.user._id).then(Customer=>{

        var stock = parseInt(req.body.amount);
        if(stock == null || stock == undefined || stock <= 0){
          res.json({'success':false});
          return
        }
        var totalStocks = 0
        var index = -1
        for(var i=0;i<Customer.portfolio.length;i++){
          totalStocks = Customer.portfolio[i].stockHeld + Customer.portfolio[i].stockShorted
          if(Customer.portfolio[i].company.toString() === Company._id.toString() ){
            index = i
          }
        }

        if (0 < stock && stock <= Math.min(Math.floor(Customer.accountBalance / Company.stockPrice), Company.availableQuantity, parameters.stockLimit-totalStocks)){
          if(index === -1){
            Customer.portfolio.push({company : Company._id, stockHeld : stock, stockShorted : 0})
          }
          else{
            Customer.portfolio[index].stockHeld += stock
          }
          Customer.accountBalance -= stock * Company.stockPrice
          Company.availableQuantity -= stock
          Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'BUY', quantity:stock, price:Company.stockPrice})
          Customer.save()
          Company.save()
          res.json({'success':true, bal:Customer.accountBalance, quan:Company.availableQuantity})
          return
        }
        else{
          res.json({'success':false})
        }
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
    customer.findById(req.user._id).then(Customer=>{

        //console.log(req.body) //for testing only
        var stock = parseInt(req.body.amount);
        if(stock == null || stock == undefined || stock <= 0){
          res.json({'success':false});
          return
        }
        var flag = 0
        for(var i=0;i<Customer.portfolio.length;i++){
          if(Customer.portfolio[i].company.toString() === Company._id.toString() && stock<=Customer.portfolio[i].stockHeld){
            Customer.portfolio[i].stockHeld -= stock
            Customer.accountBalance += stock * Company.stockPrice
            Company.availableQuantity += stock
            Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'SELL', quantity:stock, price:Company.stockPrice})
            flag = 1
            Customer.save()
            Company.save()
            res.json({'success':true, bal:Customer.accountBalance, quan:Company.availableQuantity})
            return
          }
        }
        if(flag == 0){
          res.json({'success':false});
          return
        }
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
      customer.findById(req.user._id).then(Customer=>{
        var stock = parseInt(req.body.amount);
        if(stock == null || stock == undefined || stock <= 0){
          res.json({'success':false});
          return
        }
        var totalStocks = 0
        var index = -1
        for(var i=0;i<Customer.portfolio.length;i++){
          totalStocks = Customer.portfolio[i].stockHeld + Customer.portfolio[i].stockShorted
          if(Customer.portfolio[i].company.toString() === Company._id.toString() ){
            index = i
          }
        }
        if(index == -1 && stock < parameters.stockLimit-totalStocks ){
          Customer.portfolio.push({company : Company._id, stockHeld : 0, stockShorted : stock})
          Customer.accountBalance += stock * Company.stockPrice
          Company.availableQuantity -= stock
          Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'SHORT', quantity:stock, price:Company.stockPrice})
          Customer.save()
          Company.save()
          res.json({'success':true, bal:Customer.accountBalance, quan:Company.availableQuantity})
          return
        }
        else if (stock< parameters.stockLimit-totalStocks && Customer.portfolio[index].stockHeld == 0){
          Customer.portfolio[index].stockShorted += stock
          Customer.accountBalance += stock * Company.stockPrice
          Company.availableQuantity -= stock
          Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'SHORT', quantity:stock, price:Company.stockPrice})
          Customer.save()
          Company.save()
          res.json({'success':true, bal:Customer.accountBalance, quan:Company.availableQuantity})
          return
        }
        else{
          res.json({'success':false})
          return
        }
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
      customer.findById(req.user._id).then(Customer=>{

        //  console.log(req.body) //for testing only
          var stock = parseInt(req.body.amount);
          if(stock == null || stock == undefined || stock <= 0){
            res.json({'success':false});
            return
          }
          var flag = 0
          var stock = parseInt(req.body.amount)
          for(var i=0;i<Customer.portfolio.length;i++){
            if(Customer.portfolio[i].company.toString() === Company._id.toString() && stock<=Customer.portfolio[i].stockShorted){
              Customer.portfolio[i].stockShorted -= stock
              Customer.accountBalance -= stock * Company.stockPrice
              Company.availableQuantity += stock
              Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'COVER', quantity:stock, price:Company.stockPrice})
              flag = 1
              Customer.save()
              Company.save()
              res.json({'success':true, bal:Customer.accountBalance, quan:Company.availableQuantity})
              return
            }
          }
          if(flag === 0){
            res.json({'success':false})
            return
          }
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
          res.json({amount:Customer.loan.amount})

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
          res.json({amount:Customer.loan.amount})

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
