var express = require('express');
var app = express();
var rest_api = require('./routes/rest_api')

app.use('/', express.static(__dirname + '/'));

app.all('/api', function (req, res, next) {
  console.log('API is called...');
  api = new rest_api();
  api.run();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
