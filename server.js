var http = require('http');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config = {
    user:'jigargangwal',
    database:'jigargangwal',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var pool =new pool(config);

app.get('/information-db', function (req,res){
    pool.query('SELECT * FROM test', function (err, result){
      if(err) {
          res.status(500).send(err.toString());
      } else{
          res.send(JSON.stringify(result));
      }
    });
});

var app = express();
app.use(morgan('combined'));

var articleOne={
    title:'article-one',
    headding:'Article-one',
    date:'5 sep 2016',
    content:`
            <P>
                this is my article. This is first content for my first article. i watch today funk you. it is a prank channel on youtube. blalalala. :)
            </P>
             <P>
                this is my article. This is first content for my first article. i watch today funk you. it is a prank channel on youtube. blalalala. :)
            </P>
             <P>
                this is my article. This is first content for my first article. i watch today funk you. it is a prank channel on youtube. blalalala. :)
            </P>`
};

function createTemplate(data){
    var title =data.title;
    var date= data.date;
    var heading= data.heading;
    var content = data.content;
    

var htmlTemplate=`
<html>
    <head>
        <title>${title}</title>
        
        <style>
            .container{
                max-width:80px;
                margin:0 auto;
                color:grey;
                font-family:sons-serif;
            }    
        </style>
    </head>
    <body>
        
    <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <br/>
        <h3>
            ${heading}
        </h3>
        <div>
          ${date}   
        </div>
        <div>
          ${content}
        </div>
    </div>
    </body>
</html>`;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res){
    res.send(createTemplate(articleOne));
});

app.get('/article-two', function(req,res){
    res.sendFile(path.join(__dirname, 'ui','article-two.html'));
});

app.get('/article-three', function(req,res){
    res.sendFile(path.join(__dirname, 'ui','article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
