var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(501).send("Not Implemented");
});

router.post('/', function(req, res) {
  res.status(501).send("Not Implemented");
});

module.exports = router;
