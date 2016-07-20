var express = require('express')
var request = require('request');
var cheerio = require('cheerio');
var app = express()


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var parsedResults = [];
    $('span.comhead').each(function(i, element){
      // Select the previous element
      var a = $(this).prev();
      // Get the rank by parsing the element two levels above the "a" element
      var rank = a.parent().parent().text();
      // Parse the link title
      var title = a.text();
      // Parse the href attribute from the "a" element
      var url = a.attr('href');
      // Get the subtext children from the next row in the HTML table.
      var subtext = a.parent().parent().next().children('.subtext').children();
      // Extract the relevant data from the children
      var points = $(subtext).eq(0).text();
      var username = $(subtext).eq(1).text();
      var comments = $(subtext).eq(2).text();
      // Our parsed meta data object
      var metadata = {
        rank: parseInt(rank),
        title: title,
        url: url,
        points: parseInt(points),
        username: username,
        comments: parseInt(comments)
      };
      // Push meta-data into parsedResults array
      parsedResults.push(metadata);
    });
    // Log our finished parse results in the terminal
    console.log(parsedResults);
  }
});

/* var title;
 url = 'https://www.google.co.in/search?q=dl1162';
  request(url, function (error, response, body) 
{  
  
  if (!error && response.statusCode == 200) 
  {
    var $ = cheerio.load(body);
    title = $("#rso > div.g.tpo.knavi.obcontainer.mod > div > div.card-section.vk_c > ol > li > div > span").text();
    console.log("Flight Status" + title);
  }
}) */

app.get('/', function(request, response) {
  
  response.send(title);
})



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
