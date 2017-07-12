const express = require('express');
const router = express.Router();
const User = require('./models/customer.js');
const News = require('./models/news.js');
const Company = require('./models/company.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//=========Profile Page Details=============
router.get('/customerdetail',(request,response)=>{
  User.findById(request.user._id).populate('stockHoldings.company').populate('stockShorted.company').populate('activity.company').exec((err,user)=>{
    if(err){console.log(err);}
    else{response.json(user);}
  });
});


//==========For Market Page===================
router.get('/companylist',(request,response)=>{
  User.findById(request.user._id).populate('company').exec((err,user)=>{
      if(err){console.log(err);}
    else{response.json(user);}
  });
});


//=======For Company Portfolio============
router.get('/companydetail/:id',(request,response)=>{
  Company.findById(request.params.id,(err,company)=>{
    if(err){console.log(err);}
    else{response.json(comapany);}
  });
});


//===============News Page================
router.get('/newsdetail/:id',(request,response)=>{
  News.findById(request.params.id,(err,news)=>{
    if (err){console.log(err);}
    else{response.json(news);}
  });
});

router.get('/newslist',(request,response)=>{
  News.find({}).then((news)=>{
    response.json(news);
    done();
  });
});


//==============Leaderboard page=================
router.get('/leaderboard',(request,response)=>{
  response.send('Leaderboard goes here');
});


module.exports = router;
