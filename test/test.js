var mongoose = require('mongoose')
var news = require('../app/models/news.js')
var customer = require('../app/models/customer.js')
var company = require('../app/models/company.js')

var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = require('chai').expect
var should = require('should')
var server = require('../server.js')

chai.use(chaiHttp)
mongoose.Promise = global.Promise

process.env.NODE_ENV = 'test'
