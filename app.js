var bodyParser = require('body-parser');var express = require('express');
var cookieParser = require('cookie-parser');
var debug = require('debug')('az-express-hbsstarter:server');
var http = require('http');
var logger = require('morgan')
var path = require('path');

//Setup routes
var routes = require('./routes/index');

//Setup view engine and helpers
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Setup to run the web server
var port = process.env.PORT || 1337;
app.set('port', port);

http.createServer(app)
    .listen(app.get('port'), function (req, res) {
        console.log('Azure Express HBS Starter listening on port: ' + app.get('port'));
    });