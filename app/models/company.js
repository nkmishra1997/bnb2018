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
    //max: company.totalQuantity
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

  history:[{
    timeStamp:{
      type: Date,
      default: Date.now()
    },
    stockPrice: {
    type: Number,
    min: 0
  },
    availableQuantity:
    { type: Number,
      min: 0,
      //max: company.totalQuantity
    }
  }],

  complementaryCompany : [{
		company : mongoose.Schema.Types.ObjectId,
		factor : {type: Number, min: 0.0, default: 0.0},
	}],

	supplementaryCompany : [{
		company : mongoose.Schema.Types.ObjectId,
		factor : {type: Number, min: 0.0, default: 0.0},
	}]
});

const company = module.exports = mongoose.model('company', companySchema);
//module.exports = company;
// Functions responding to the APIs quering the database will go after this comment
