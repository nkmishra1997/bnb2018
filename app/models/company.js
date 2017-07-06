const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name:{
    type: String,
  },
  symbol: String,
  description: String,
  stockPrice: Number,
  availableQuantitiy: Number,
  totalQuantity: Number,
  annualGrowthRate: Number,
  marketcap: Number,
  history:{
    timeStamp: Date.now(),
    stockPrice: Number,
    availableQuantity: Number
  },
  complementaryCompany:{
    company: [String],
    factor: Number
  },
  supplimentaryCompany:{
    company: [String],
    factor: Number
  },
});

const company = module.exports = mongoose.model('company', companySchema);
//module.exports = company;
// Functions responding to the APIs quering the database will go after this comment
