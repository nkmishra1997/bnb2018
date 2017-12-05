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
      name : 'Amazon',
      symbol : 'AMZ',
      description : 'e-com',
      stockPrice : 700,
      availableQuantity : 500,
      totalQuantity : 900,
      annualGrowthRate: 4,
      marketCap : 7,
     });

  describe('Saving a company to the database',function(done){
    /*
  beforeEach((done) => {
        testCompany.remove({}).then(()=>{
          done();
        });
    });
    */
    //A test company
    it('saves company',()=>{
      test_company.save().then(()=>{
        assert(!test_company.isNew);
        done();
      });
    });
});
