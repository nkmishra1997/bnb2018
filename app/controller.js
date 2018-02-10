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
      if(element.isCrypto==false){
     var trend = 0;
     if(element.history.length>1){
      trend =  (((element.history[element.history.length-1].stockPrice-element.history[element.history.length-2].stockPrice)/element.history[element.history.length-2].stockPrice)*100).toFixed(2)
     }
      var company = {
        
        id: element._id,
        symbol: element.symbol,
        name: element.name,
        stockPrice: element.stockPrice,
        annualGrowthRate: trend,
        availableQuantity: element.availableQuantity,
        isIncreasing: element.isIncreasing
      }
      companylist.push(company)}
    })
    res.json(companylist)
  })
  .catch(err=>{
    console.log(err)
		res.send("unable to fetch company list")
  })
}

exports.cryptoList = function(req, res){
  company.find({}).then(companies=>{
    //var accountBal = {'accountBalance' : req.user.accountBalance}
    var cryptolist = []
    companies.forEach((element)=>{
      if(element.isCrypto==true){
        var trend = 0;
     if(element.history.length>1){
      trend =  (((element.history[element.history.length-1].stockPrice-element.history[element.history.length-2].stockPrice)/element.history[element.history.length-2].stockPrice)*100).toFixed(2)
     }
      var crypto = {
        id: element._id,
        symbol: element.symbol,
        name: element.name,
        stockPrice: element.stockPrice,
        annualGrowthRate: trend,
        availableQuantity: element.availableQuantity,
        isIncreasing: element.isIncreasing
      }
      cryptolist.push(crypto)}
    })
    res.json(cryptolist)
  })
  .catch(err=>{
    console.log(err)
		res.send("unable to fetch crypto list")
  })
}


exports.companyDetails = function(req, res){
  company.findById(req.params.id).then((compDetails)=>{
    customer.findById(req.user._id).then(Customer=>{
      var accountBalance = Customer.accountBalance
      // var buyMax = Math.min(Math.floor(accountBalance/compDetails.stockPrice),compDetails.availableQuantity)
      // var sellMax = Math.min(Math.floor(accountBalance/compDetails.stockPrice),(compDetails.totalQuantity-compDetails.availableQuantity))
      // var shortMax = parameters.shortMax
      // var coverMax = Math.min(Math.floor(accountBalance/compDetails.stockPrice),shortMax)

      var details = {
        name: compDetails.name,
        stockPrice: compDetails.stockPrice,
        availableQuantity: compDetails.availableQuantity,
        marketcap: compDetails.marketcap,
        annualGrowthRate: compDetails.annualGrowthRate,
        history: compDetails.history,  ////dont send entire history
        accountBalance : accountBalance,
        annualReport: compDetails.annualReport
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

exports.newsList = function(req, res){
  news.find({}).then(newslist=>{
    var news = []
    newslist.forEach((element)=>{
      if(element.flag>0){
        news.push(element)
      }
    })
    res.json(news)
  }).catch(err=>{
    console.log(err);
		res.send("unable to fetch news list")
  })
}


exports.adminNewsList = function(req, res){
  news.find({}).then(newslist=>{
    var news = []
    newslist.forEach((element)=>{
        news.push(element)
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
    var player = {
      name : Customer.facebook.name,
      id: Customer.facebook.id,
      accountBalance: Customer.accountBalance,
      loan: Customer.loan.amount,
      portfolio: Customer.portfolio,
      activity: Customer.activity,
      worth : Customer.worth
    }
    res.json(player)

  }).catch(err=>{
    console.log(err)
  	res.send("unable to fetch customer details")
  })
}


exports.customerList = function(req, res) {
  customer.find({})
  .sort({ worth: -1 })
  .then(customerlist=> {
    var playerList = []
    for(var i=0;i<customerlist.length;i++){
      var player = {
        name : customerlist[i].facebook.name,
        id : customerlist[i].facebook.id,
        worth : customerlist[i].worth,
        rank : i+1
      }
      playerList.push(player)
    }
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
          res.json({'success':false,'msg':'Jack asses not allowed in stock market.'});
          return
        }
        var totalHeld = 0
        var index = -1
        for(var i=0;i<Customer.portfolio.length;i++){
          totalHeld += Customer.portfolio[i].stockHeld
          if(Customer.portfolio[i].company.toString() === Company._id.toString() ){
            index = i
          }
        }

        if (0 < stock && stock <= Math.min(Math.floor(Customer.accountBalance / Company.stockPrice), Company.availableQuantity, parameters.heldLimit-totalHeld)){
          if(index === -1){
            Customer.portfolio.push({company : Company._id, stockHeld : stock, stockShorted : 0})
          }
          else{
            if(Customer.portfolio[index].stockShorted == 0){
              Customer.portfolio[index].stockHeld += stock
            }
            else{
              res.json({'success':false,'msg':'You have shorted the stocks of this company. Cover them first.'})
              return
            }
          }
          Customer.accountBalance -= stock * Company.stockPrice
          Company.availableQuantity -= stock
          Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'BUY', quantity:stock, price:Company.stockPrice})
          Customer.save()
          Company.save()
          res.json({'success':true,'msg':'Buy Successful'})
          return
        }
        else{
          if(stock>Math.floor(Customer.accountBalance / Company.stockPrice)){
            res.json({'success':false,'msg':'Insufficient account balance to buy ' + stock + ' stocks'})
          }
          else if(stock > parameters.heldLimit-totalHeld){
            res.json({'success':false,'msg':'Buy Limit of ' + parameters.heldLimit + ' stocks reached. Sell Some Stocks to continue buying.'})
          }
          res.json({'success':false,'msg': 'Buy Unsuccessful. Retry again'})
        }
      }).catch(err=>{
        console.log(err)
        res.json({'success':false,'msg': 'Check Internet Connection'})
      })
    }).catch(err=>{
      console.log(err)
    	res.json({'success':false,'msg': 'Check Internet Connection'})
    })
}


exports.sell = function(req, res){
  company.findById(req.params.id).then(Company=>{
    customer.findById(req.user._id).then(Customer=>{

        //console.log(req.body) //for testing only
        var stock = parseInt(req.body.amount);
        if(stock == null || stock == undefined || stock <= 0){
          res.json({'success':false,'msg':'Jack asses not allowed in stock market.'});
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
            res.json({'success':true,'msg':'Sell Successful'})
            return
          }
        }
        if(flag == 0){
          res.json({'success':false,'msg':'No Stocks to sell. Buy some stocks first.'});
          return
        }
      }).catch(err=>{
        console.log(err)
        res.json({'success':false,'msg': 'Check Internet Connection'})
      })
    }).catch(err=>{
      console.log(err)
    	res.json({'success':false,'msg': 'Check Internet Connection'})
    })
}


exports.short = function(req, res){
    company.findById(req.params.id).then(Company=>{
      customer.findById(req.user._id).then(Customer=>{
        var stock = parseInt(req.body.amount);
        if(stock == null || stock == undefined || stock <= 0){
          res.json({'success':false,'msg':'Jack asses not allowed in stock market.'});
          return
        }
        var shortedStocks = 0
        var index = -1
        for(var i=0;i<Customer.portfolio.length;i++){
          shortedStocks += Customer.portfolio[i].stockShorted
          if(Customer.portfolio[i].company.toString() === Company._id.toString() ){
            index = i
          }
        }
        if(index == -1 && stock <= parameters.shortLimit-shortedStocks ){
          Customer.portfolio.push({company : Company._id, stockHeld : 0, stockShorted : stock})
          Customer.accountBalance += stock * Company.stockPrice
          Company.availableQuantity -= stock
          Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'SHORT', quantity:stock, price:Company.stockPrice})
          Customer.save()
          Company.save()
          res.json({'success':true, 'msg':'Short Successful'})
          return
        }
        else if (stock< parameters.shortLimit-shortedStocks){
          if(Customer.portfolio[index].stockHeld >= stock){
            //sell the stocks
            Customer.portfolio[i].stockHeld -= stock
            Customer.accountBalance += stock * Company.stockPrice
            Company.availableQuantity += stock
            Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'SELL', quantity:stock, price:Company.stockPrice})
            flag = 1
            Customer.save()
            Company.save()
            res.json({'success':true, 'msg':'Short Successful. Sold ' + stock+ ' stocks.'})
            return
          }
          else{
            //sell all stocks

            //short remaining stocks
            toSell = Customer.portfolio[index].stockHeld;
            toShort = stock - Customer.portfolio[index].stockHeld
            Customer.portfolio[index].stockShorted += toShort
            Customer.portfolio[index].stockHeld = 0;
            Customer.accountBalance += stock * Company.stockPrice
            Company.availableQuantity += (toSell - toShort)
            Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'SELL', quantity:toSell, price:Company.stockPrice})
            Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'SHORT', quantity:toShort, price:Company.stockPrice})
            Customer.save()
            Company.save()
            res.json({'success':true, 'msg':'Short Successful. Sold ' + toSell + ' stocks and shorted ' + toShort + 'stocks'})
            return
          }
        }
        else{
          res.json({'success':false,'msg':'Short Limit of ' + parameters.shortLimit + ' reached. Cover some stocks to short more stocks.'})
          return
        }
      }).catch(err=>{
        console.log(err)
        res.json({'success':false,'msg': 'Check Internet Connection'})
      })
    }).catch(err=>{
      console.log(err)
    	res.json({'success':false,'msg': 'Check Internet Connection'})
    })
}


exports.cover = function(req, res){
    company.findById(req.params.id).then(Company=>{
      customer.findById(req.user._id).then(Customer=>{
          var stock = parseInt(req.body.amount);
          if(stock == null || stock == undefined || stock <= 0){
            res.json({'success':false,'msg':'Jack asses not allowed in stock market.'});
            return
          }
          var flag = 0
          var stock = parseInt(req.body.amount)
          for(var i=0;i<Customer.portfolio.length;i++){
            if(Customer.portfolio[i].company.toString() === Company._id.toString() && stock<=Customer.portfolio[i].stockShorted){
              if(Customer.accountBalance >= stock * Company.stockPrice){
                Customer.portfolio[i].stockShorted -= stock
                Customer.accountBalance -= stock * Company.stockPrice
                Company.availableQuantity += stock//check
                Customer.activity.push({company:Company._id, timeStamp:Date.now(), action:'COVER', quantity:stock, price:Company.stockPrice})
                flag = 1
                Customer.save()
                Company.save()
                res.json({'success':true, 'msg':'Cover Successful'})
                return
              }
              else{
                res.json({'success':false, 'msg':'Insufficient balance.'})
              }
            }
          }
          if(flag === 0){
            res.json({'success':false,'msg':'No Stocks to Cover. Short some stocks first.'});
            return
          }
      }).catch(err=>{
        console.log(err)
        res.json({'success':false,'msg': 'Check Internet Connection'})
      })
    }).catch(err=>{
      console.log(err)
    	res.json({'success':false,'msg': 'Check Internet Connection'})
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

        var amount = parameters.repayAmount
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
        isCrypto: req.body.isCrypto,
        stockPrice: req.body.stockPrice,
        availableQuantity: req.body.availableQuantity,
        totalQuantity: req.body.totalQuantity,
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
  console.log(req.body);
    var newNews = new news(req.body)
    //   {
    //   newsText : req.body.newsText,
    //   youtubeSrc : req.body.youtubeSrc,
    //   flag : req.body.flag,
    //   newsImpact : req.body.newsImpact
    // }
  // )
    // for (var key in req.body.newsImpact) {
    //   console.log(key);
    //   newNews.newsImpact.push(key);
    // }
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
          News.flag = req.body.flag
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
