var express = require('express')
var request = require('request');
var cheerio = require('cheerio');
var jsdom = require('jsdom');
var url = require('url')
  , http = require('http')
  , path = require('path');
var app = express()


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  //Tell the request that we want to fetch youtube.com, send the results to a callback function
  request({uri: 'http://youtube.com'}, function(err, response, body){
    var self = this;
    self.items = new Array();//I feel like I want to save my results in an array

    //Just a basic error check
    if(err && response.statusCode !== 200){console.log('Request error.');}
    //Send the body param as the HTML code we will parse in jsdom
    //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
    jsdom.env({
      html: body,
      scripts: ['http://code.jquery.com/jquery-1.10.2.min.js'],
      done: function(err, window){
        //Use jQuery just as in a regular HTML page
        var $ = window.jQuery;
        var $body = $('body');
        var $videos = $body.find('.context-data-item');

        $videos.each( function(i, item) {

          self.items[i] = {
            time:   $(item).attr('data-context-item-time'),
            type:   $(item).attr('data-context-item-type'),
            id:     $(item).attr('data-context-item-id'),
            views:  $(item).attr('data-context-item-views'),
            title:  $(item).attr('data-context-item-title'),
            user:   $(item).attr('data-context-item-user')
          };
        });

        console.log( self.items );
        res.end( "Done." );
      }
    });
  });
});




/*
 var title;
 url = 'https://www.google.co.in/search?q=dl1162';
  request(url, function (error, response, body) 
{  
  
  if (!error && response.statusCode == 200) 
  {
    var $ = cheerio.load(body);
    title = $("#logocont > h1").text();
    console.log(title);
  }
}) */

app.get('/', function(request, response) {
  
  response.send(title);
})



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
