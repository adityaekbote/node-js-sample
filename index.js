var express = require('express')
var request = require('request');
var cheerio = require('cheerio');
var app = express()


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
var title;
request({
    method: 'GET',
    url: 'https://github.com/showcases'
}, function(err, response, body) {
    if (err) return console.error(err);

    // Tell Cherrio to load the HTML
    $ = cheerio.load(body);
    $('li.collection-card').each(function() {
            var href = $('a.collection-card-image', this).attr('href');
            if (href.lastIndexOf('/') > 0) {
                console.log($('h3', this).text());
                title = $('h3', this).text();
            }
    });
});
/*
 var title;
 url = 'http://www.flightstats.com/go/FlightTracker/flightTracker.do?airlineCode=DL&flightNumber=1432';
  request(url, function (error, response, body) 
{  
  
  if (!error && response.statusCode == 200) 
  {
    var $ = cheerio.load(body);
    title = $('#scheduled_table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2)').text();
    console.log(title);
  }
})
*/
app.get('/', function(request, response) {
  response.send(title);
})



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
