// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

    accountBalance: {
      type : Number,
      default: 0
    },

    activity :{
      company: [String],
      timeStamp: {
        type: Date,
        default: Date.now()
      },
      action: String, // Subject to change, as I was unclear of the data type this variable represents
      quantity: Number,
      price: Number
    },

    stockHoldings :{
      company: [String],
      quantity: Number
    },

    stockShorted:{
      company: [String],
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
      }
      repayTime: {
        type: Date,
        default: Date.now()
      }
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
