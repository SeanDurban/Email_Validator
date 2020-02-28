const express = require('express');
const router = express.Router();

const emailValidator = require('.././validation/emailValidator');

router.get('/validate', function(req, res) {
  res.status(501).send("Not Implemented");
});

router.post('/validate', async function(req, res) {
  if(req.body.email == null) {
    res.status(403).send("Must provide email.");
  }
  else { 
    let validation = await emailValidator.validateEmail(req.body.email);
    res.status(200).send(validation);
  }
});

module.exports = router;
