var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var customers = require('./routes/customers');
var orders = require('./routes/orders');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Routes
app.use('/customers', customers);
app.use('/orders', orders);
// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

var server = app.listen(process.env.PORT || 3000, function () {
  // this function is a callback
  // using 'server' in here works b/c of Closure
  console.log('Listening on port %d ', server.address().port);
});
