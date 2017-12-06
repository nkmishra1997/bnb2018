var mongoose = require('mongoose')
var news = require('../app/models/news.js')
//var customer = require('../app/models/customer.js')
var company = require('../app/models/company.js')

var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = require('chai').expect
var should = require('should')
var server = require('../server.js')

chai.use(chaiHttp)
mongoose.Promise = global.Promise

process.env.NODE_ENV = 'test'

describe('GET requests',()=>{

  it('/companylist',(done)=>{

    let Company = new company({
      name : 'Amazon',
      symbol : 'AMZ',
      description : 'e-com',
      stockPrice : 700,
      availableQuantity : 500,
      totalQuantity : 900,
      annualGrowthRate: 4,
      marketCap : 7,
     })

     Company.save((err,company)=>{
       chai.request(server)
       .get('/companylist')
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
     })
  })

  it('/newslist',(done)=>{

    let News = new news({
      newsText : 'Titans are humans',
      youtubeSrc : 'NA',
      isPublished : true,
      newsImpact : {
        company : 'ABC',
        impact : 'Shingeki no kyojin'
      }
     })

     News.save((err,news)=>{
       chai.request(server)
       .get('/newslist')
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
     })
  })

  it('/companydetail/:id',(done)=>{

    let Company = new company({
      name : 'Amazon',
      symbol : 'AMZ',
      description : 'e-com',
      stockPrice : 700,
      availableQuantity : 500,
      totalQuantity : 900,
      annualGrowthRate: 4,
      marketCap : 7,
     })

     Company.save((err,company)=>{
       chai.request(server)
       .get('/companydetail/' + Company.id)
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
     })
  })
})

describe('POST requests',()=>{

  it('/buy/:id',(done)=>{

    let Company = new company({
      name : 'Amazon',
      symbol : 'AMZ',
      description : 'e-com',
      stockPrice : 700,
      availableQuantity : 500,
      totalQuantity : 900,
      annualGrowthRate: 4,
      marketCap : 7,
     })

     let buy = {
       amount : 10
     }

     Company.save((err,company)=>{
       chai.request(server)
       .post('/buy/' + Company.id)
       .send(buy)
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
     })
  })

  it('/sell/:id',(done)=>{

    let Company = new company({
      name : 'Amazon',
      symbol : 'AMZ',
      description : 'e-com',
      stockPrice : 700,
      availableQuantity : 500,
      totalQuantity : 900,
      annualGrowthRate: 4,
      marketCap : 7,
     })

     let sell = {
       amount : 10
     }

     Company.save((err,company)=>{
       chai.request(server)
       .post('/sell/' + Company.id)
       .send(sell)
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
     })
  })

  it('/short/:id',(done)=>{

    let Company = new company({
      name : 'Amazon',
      symbol : 'AMZ',
      description : 'e-com',
      stockPrice : 700,
      availableQuantity : 500,
      totalQuantity : 900,
      annualGrowthRate: 4,
      marketCap : 7,
     })

     let short = {
       amount : 10
     }

     Company.save((err,company)=>{
       chai.request(server)
       .post('/short/' + Company.id)
       .send(short)
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
     })
  })

  it('/cover/:id',(done)=>{

    let Company = new company({
      name : 'Amazon',
      symbol : 'AMZ',
      description : 'e-com',
      stockPrice : 700,
      availableQuantity : 500,
      totalQuantity : 900,
      annualGrowthRate: 4,
      marketCap : 7,
     })

     let cover = {
       amount : 10
     }

     Company.save((err,company)=>{
       chai.request(server)
       .post('/cover/' + Company.id)
       .send(cover)
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
     })
  })

  it('/takeloan',(done)=>{

     let loan = {
       amount : 10
     }

       chai.request(server)
       .post('/takeloan')
       .send(loan)
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
  })

  it('/repayloan',(done)=>{

     let loan = {
       amount : 10
     }

       chai.request(server)
       .post('/repayloan')
       .send(loan)
       .end((err,res)=>{
         res.status.should.equal(200)
         expect(res.body).to.be.an('object')
         res.should.have.property('error',false)
         done()
       })
  })
})
