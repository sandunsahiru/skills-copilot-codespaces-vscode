// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var commentFile = 'comments.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Read comments from comments.json
app.get('/comments', function(req, res) {
  fs.readFile(commentFile, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

// Write comments to comments.json
app.post('/comments', function(req, res) {
  fs.readFile(commentFile, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentFile, JSON.stringify(comments, null, 2), function(err) {
        if (err) {
          console.log(err);
        } else {
          res.send('Comment added!');
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000.');
});