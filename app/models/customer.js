// app/models/user.js
// load the things we need
const mongoose = require('mongoose');
const company = require('./company.js');
const parameters = require('../parameters');
// define the schema for our user model
var userSchema = mongoose.Schema({

    ban: {
      type: Boolean,
      default: true,
      required:true
    },

    admin:{
      type: Boolean,
      default: false
    },

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },

    accountBalance : { type : Number, default: parameters.accountBalance, min: 0, required:true },
    worth : { type : Number, default: parameters.accountBalance, required:true },
    
    activity :[{
      company: {type: mongoose.Schema.Types.ObjectId, ref:'company'},
      timeStamp: { type: Date, default: Date.now()},
      action: String, // Subject to change, as I was unclear of the data type this constiable represents
      quantity: {type : Number, default: 0,min: 0},
      price: { type : Number, default: 0, min: 0.0}
    }],

    portfolio: [{
        company: {type: mongoose.Schema.Types.ObjectId, ref:'company'},
        stockHeld: {type: Number, min: 0, max: parameters.stockLimit},
        stockShorted: {type: Number, min: 0, max: parameters.stockLimit}
    }],

    loan :{
      taken:{
        type: Boolean,
        default: false,
        required:true
      },
      amount: {
      type : Number,
      default: 0,
      min: 0.0,
      max:parameters.loanAmount
    },
      takeOutTime:{
        type: Date,
      },
      repayTime: {
        type: Date,
      }
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
