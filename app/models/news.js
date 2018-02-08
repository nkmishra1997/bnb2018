const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');

const newsSchema = new Schema({
  newsText:{
    type:String,
    unique: true
  },

  youtubeSrc: String,

  flag:{
    type: String,
    default: 0,
    required:true
  },

  publishedOn:{
    type: Date,
    default: Date.now()
  },

  createdOn:{
    type: Date,
    default: Date.now()
  },

  newsImpact:[{
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    impact: Number,
    iterationsRun: Number
  }]
});

const news = mongoose.model('newsUpdate',newsSchema);
module.exports = news;

// Functions responding to the APIs quering the database will go after this comment
