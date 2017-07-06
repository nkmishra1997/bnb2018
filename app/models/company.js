const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name:{
    type: String,
  },

  symbol: String,

  description: String,

  stockPrice: {
    type: Number,
    min: 0
  },

  availableQuantitiy: {
    type: Number,
    min: 0,
    max: totalQuantity
  },

  totalQuantity: {
    type: Number,
    min: 0
  },

  annualGrowthRate: {
    type: Number,
    min: 0
  },

  marketcap: {
    type: Number,
    min: 0
  },

  history:{
    timeStamp: Date.now(),
    stockPrice: {
    type: Number,
    min: 0
  },
    availableQuantity:
    { type: Number,
      min: 0,
      max: totalQuantity
    }
  },

  complementaryCompany:{
    comapny: [String],
    factor: {
    type: Number,
    min: 0
  }
  },

  supplimentaryCompany:{
    comapny: [String],
    factor: {
    type: Number,
    min: 0
  }
  },
});

const company = mongoose.model('company', companySchema);
module.exports = company;

// Functions responding to the APIs quering the database will go after this comment
