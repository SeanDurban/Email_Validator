const express = require('express');
const router = express.Router();

const emailValidator = require('.././validation/emailValidator');

router.get('/validate', function(req, res) {
  res.status(501).send("Not Implemented");
});

router.post('/validate', function(req, res) {
  if(req.body.email == null) {
    res.status(403).send("Must provide email.");
  }
  else { 
    res.status(200).send(emailValidator.validateEmail(req.body.email));
  }
});

module.exports = router;
