//Require the modules
const mongoose = require('mongoose');
const testCompany = require('../app/models/company.js');
const dt = require('../config/database.js');

//Require the dev-dependencies
const assert = require('chai').assert;
const expect = require('chai').expect;

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

before(function(done){
  mongoose.connect(dt.url, function(err, db) {
  if (err)
        console.log('Unable to connect to DB' + err);
  else {
        console.log('Connection to DB successful');
        setTimeout(done,10000);
       }
  done();
  };
  });
  describe('Saving a company to the database',function(){
  beforeEach((done) => {
        testCompany.remove({}, (err) => {
        done();
        });
    });

    //A test company
    var test_company = new testCompany({
  			name : 'ABC',
  			symbol : 'ABC',
  			description : 'XYZ',
        stockPrice : 500,
        availableQuantity : 200,
        totalQuantity : 800,
        annualGrowthRate: 2,
        marketCap : 5,
       });

       test_company.save((err, test_company) => {
           describe('#name()', function(){
           it('should return the value as String', function(){
           assert.isString(test_company.name , 'Yeah it works');
           });
       });
       });
    db.close();
});
