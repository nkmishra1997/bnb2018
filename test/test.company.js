//Require the modules
//const MongoClient = require('mongodb').MongoClient;
const testCompany = require('../app/models/company.js');
const dt = require('../config/database.js');

//Require the dev-dependencies
const assert = require('chai').assert;
const expect = require('chai').expect;

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//MongoClient.connect(dt.url, function(err, db) {

//  if (err) throw err;
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
           // UserBan = db.collection('company').find(User.ban);
           assert.isString(test_company.name , 'Yeah it works');
           });
       });
       });
});
//    db.close();
//});
