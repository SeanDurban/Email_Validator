var express = require('express');

var emailRouter = require('./routes/email');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/email', emailRouter);

module.exports = app;
