const http = require('http');
var path = require('path');

var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.redirect('/home');
});

router.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

module.exports = router;