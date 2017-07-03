const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  newsText: String,
  youtubeSrc: String,
  isPublished:{
    type: Boolean,
    default: false
  },
  publishedOn:{
    type: Date,
    default: Date.now()
  },
  newsImpact:{
    company: [String],
    impact: String,
    iterationsRun: Number
  }
});

const news = mongoose.model('newsUpdate',newsSchema);
module.exports = news;

// Functions responding to the APIs quering the database will go after this comment
