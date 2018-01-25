const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');

const newsSchema = new Schema({
  newsText:{
    type:String,
    unique: true
  },

  youtubeSrc: String,

  isPublished:{
    type: Boolean,
    default: false,
    required:true
  },

  publishedOn:{
    type: Date,
  },
  
  newsImpact:[{
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    impact: String,
    iterationsRun: Number
  }]
});

const news = mongoose.model('newsUpdate',newsSchema);
module.exports = news;

// Functions responding to the APIs quering the database will go after this comment
