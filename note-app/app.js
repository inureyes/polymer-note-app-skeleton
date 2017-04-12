var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rest_api = require('./routes/rest_api')

app.use(bodyParser.json()); // for parsing application/json
//app.use(/^((?!.*abc).*)/, express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/'));

app.all('/api', function (req, res, next) {
  console.log('API is called...');
  api = new rest_api();
  result = api.run(req);
  if (result) {
    res.json({success: true})
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
