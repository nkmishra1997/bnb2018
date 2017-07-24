//Require the modules
const mongoose = require('mongoose');
const testNews = require('../app/models/news.js');
const dt = require('../config/database.js');

//Require the dev-dependencies
const assert = require('chai').assert;
const expect = require('chai').expect;
mongoose.Promise = global.Promise;
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

  var test_news = new testNews({
      newsText : 'Titans are humans',
      youtubeSrc : 'NA',
      isPublished : true,
      newsImpact : {
        company : 'ABC',
        impact : 'Shingeki no kyojin'
      }
     });

  describe('Saving news to the database',function(){
    /*
  beforeEach((done) => {
        testNews.remove({}).then(()=>{
          done();
        });
    });
    */
    //A test company
    it('saves news',(done)=>{
      test_news.save().then(()=>{
        assert(!test_news.isNew);
        done();
      });
    });
});
