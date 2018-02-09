var mongoose = require('mongoose')
var company = require('./models/company');
var customer = require('./models/customer');
var news = require('./models/news');
var parameters = require('./parameters.js');
mongoose.Promise = global.Promise;



news.find({}, function(err, News){
    // console.log(News[0].flag,"third");

    if (err) {
        console.log(err);
        // res.send("unable to load news");
    }
    else{ 
        var k=0;
      while(News[k].flag=="2") {
      if(k!=News.length-1){
      k++;}}
        setInterval(function(){
            if((k<News.length)&&(News[k].flag=="1")){
            News[k].flag="2";
            // console.log("change in",k)
            console.log("news not available is",k);
            News[k].save();
            k++;}

         }, 6000);
         var l=k;

         while(News[l].flag=="1"){ 
            if(l!=News.length-1){
              l++;}}
              setInterval(function(){
                  if((l<News.length)&&(News[l].flag=="0")){
                  News[l].flag="1";
                  // console.log("change in",k)
                  console.log("news available is",l);
                  News[l].save();
                  l++;}
      
               }, 6000);
    }
});


