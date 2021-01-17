const http = require('http');
var path = require('path');
const fetch = require('node-fetch');

var express = require('express');
var router = express.Router();

/**
 * Retries a fetch call if the response is not correct 
 *
 * @param {string} url target of fetch call
 * @param {int} attempts maximum number of attempts
 */
function fetchRetry(url, attempts = 20) {
  return fetch(url)
    .then(res => {
      // content-length = 28 means the availability data hasn't been properly sent
      if (res.ok && res.headers.get('content-length') > 28) {
        return res.json();
      }

      if (attempts > 0) {
        console.log("attempt number " + attempts + " for url " + url);
        return fetchRetry(url, attempts - 1);
      } else {
        throw new Error(res.status + " error");
      }
    })
    .catch(error => console.log(error.message));
}

router.get('/v2/products/:category', function(req, res) {
  let url = "https://bad-api-assignment.reaktor.com/v2/products/" + req.params.category;
  fetchRetry(url)
  .then(data => {
    res.send(data);
  });
});

router.get('/v2/availability/:manufacturer', function(req, res) {
  let url = "https://bad-api-assignment.reaktor.com/v2/availability/" + req.params.manufacturer;
  fetchRetry(url)
  .then(data => {
    res.set('Cache-control', 'public, max-age=300');
    res.send(data);
  });
});

router.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = router;