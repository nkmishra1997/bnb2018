//Require the modules
const mongoose = require('mongoose');
const testCompany = require('../app/models/company.js');
const dt = require('../config/database.js');

//Require the dev-dependencies
const assert = require('chai').assert;
const expect = require('chai').expect;
mongoose.Promise = global.Promise;
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

before(function(done){
  mongoose.connect(dt.url, function(err) {
  if (err)
        console.log('Unable to connect to DB' + err);
  else {
        console.log('Connection to DB successful');
        done();
       }
  });
  });

  var test_company = new testCompany({
      name : 'Flipkart',
      symbol : 'FLP',
      description : 'e-com',
      stockPrice : 500,
      availableQuantity : 200,
      totalQuantity : 800,
      annualGrowthRate: 2,
      marketCap : 5,
     });

  describe('Saving a company to the database',function(){
    /*
  beforeEach((done) => {
        testCompany.remove({}).then(()=>{
          done();
        });
    });
    */
    //A test company
    it('saves company',(done)=>{
      test_company.save().then(()=>{
        assert(!test_company.isNew);
        done();
      });
    });
});
