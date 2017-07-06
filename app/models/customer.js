// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var Company = require('./company');

// define the schema for our user model
var userSchema = mongoose.Schema({

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },

    accountBalance : {
      type : Number,
      default: 0
    },

    activity :{
      company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
      timeStamp: {
        type: Date,
        default: Date.now()
      },
      action: String, // Subject to change, as I was unclear of the data type this variable represents
      quantity: Number,
      price: Number
    },

    stockHoldings :{
      company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
      quantity: Number
    },

    stockShorted:{
      company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
      quantity: Number
    },

    loan :{
      taken:{
        type: Boolean
      },
      amount: Number,
      takeOutTime:{
        type: Date,
        default: Date.now()
      },
      repayTime: {
        type: Date,
        default: Date.now()
      }
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
