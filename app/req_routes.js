const express = require('express');
const router = express.Router();
const User = require('./models/customer.js');
//const News = require('./models/news.js');
//const Company = require('./models/company.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

router.get('/customerdetail',(request,response)=>{
  User.findById(request.user._id).populate('stockHoldings.company').populate('stockShorted.company').populate('activity.company').exec((err,user)=>{
    if(err){console.log(err);}
    else{response.json(user);}
  });
});
module.exports = router;
