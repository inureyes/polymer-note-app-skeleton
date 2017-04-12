var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/'));

app.all('/api', function (req, res, next) {
  console.log('API is called...');
  next();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
