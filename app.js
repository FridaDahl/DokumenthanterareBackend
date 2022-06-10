var express = require('express');
let cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require("mysql2");



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let documentRouter = require('./routes/document');

var app = express();

app.locals.con = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "documentbook",
    password: "dw!DBpw54root",
    database: "documentbook"
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/document', documentRouter);

module.exports = app;
