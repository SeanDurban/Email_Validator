var express = require('express');

var baseRouter = require('./routes/base');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', baseRouter);

module.exports = app;
