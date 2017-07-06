const express = require('express');
const router = express.Router();
const User = require('./models/customer.js');
const News = require('./models/news.js');
const Company = require('./models/company.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

router.get('/customerdetail',(request,response)=>{
  User.findById(request.user._id).populate('stockHoldings.company').populate('stockShorted.company').populate('activity.company').exec((err,user)=>{
    if(err){console.log(err);}
    else{response.json(user).pretty();}
  });
});

router.get('/newsdetail/:id',(request,response)=>{
  News.findById(request.params.id,(err,news)=>{
    if (err){console.log(err);}
    else{response.json(news).pretty();}
  });
});

router.get('/companydetail',(request,response)=>{
  Company.findById(request.company._id,(err,company)=>{
    if(err){console.log(err);}
    else{response.json(comapany).pretty();}
  });
});

router.get('/newslist',(request,response)=>{
  News.find({}).then((news)=>{
    response.json(news).pretty();
    done();
  });
});

router.get('/leaderboard',(request,response)=>{
  response.send('Leaderboard goes here');
});
module.exports = router;
