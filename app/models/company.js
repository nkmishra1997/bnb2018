const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const parameters = require('../parameters');

const companySchema = new Schema({
  name:{
    type: String,
    unique: true,
    required:true
  },

  symbol:{
    type: String,
    unique: true,
    required:true
  },

  description: String,

  stockPrice: {
    type: Number,
    default:0,
    min: 0.0,
    required:true
  },

  availableQuantity: {
    type: Number,
    default: 0,
    min: 0.0,
    max: parameters.maxNumberOfShares,
    required:true
    //max: company.totalQuantity
  },

  totalQuantity: {
    type: Number,
    default:0,
    min: 0.0,
    max: parameters.maxNumberOfShares,
    required:true
  },

  annualGrowthRate: {
    type: Number,
    min: 0
  },

  marketcap: {
    type: Number,
    min: 0
  },

  history:[{
    timeStamp:{
      type: Date    },
    stockPrice: {
    type: Number,
    default: 0,
    min: 0
  },
    availableQuantity:
    { type: Number,
      min: 0.0,
      max: parameters.maxNumberOfShares
    }
  }]
});

const company = module.exports = mongoose.model('company', companySchema);
//module.exports = company;
// Functions responding to the APIs quering the database will go after this comment
