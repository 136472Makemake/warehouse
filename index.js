require('dotenv').config({ path: `/.env` }); // in path
var express = require('express');
const http = require('http');
//const { handleRequest } = require('./routes');
var routes = require('./routes');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static('public'));

app.use('/', routes);

app.use(function (req,res,next){
	res.status(404).send('404 Not Found');
});

var server = app.listen(PORT, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

})

server.on('error', err => {
  console.error(err);
  server.close();
});

server.on('close', () => console.log('Server closed.'));