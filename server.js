'use strict';

var express = require('express');
var compress = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var errorHandler = require('errorhandler');
var path = require('path');


/**
 * Create Express server.
 */
var app = express();
var hour = 3600000;
var day = hour * 24;
var week = day * 7;


/**
 * Load controllers.
 */
var API = require('./controllers/api');


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {maxAge: week}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/**
 * Application routes.
 */
app.get('/', API.index);
app.get('/api/', API.index);
// All
app.get('/api/v2', API.getAll);
// Name
app.get('/api/v2/name/:countryName', API.name);
// Code

// List of codes

// Currency
app.get('/api/v2/currency/:currencyCode', API.currency);
// Language

// Capital city

// Calling code
app.get('/api/v2/callingcode/:callingCode', API.callingCode);
// Region
app.get('/api/v2/region/:regionName', API.region);
// SubRegion
app.get('/api/v2/subregion/:subregionName', API.subregion);

/**
 * 500 Error Handler.
 * As of Express 4.0 it must be placed at the end, after all routes.
 */
app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message && (err.message.indexOf('not found') || err.message.indexOf('Cast to ObjectId failed'))) {
        return next();
    }
    res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        error: err
    });
});

// assume 404 since no middleware responded
app.use(function (req, res) {
    res.status(404).json({
        status: 404,
        message: 'Not Found',
        url: req.originalUrl
    });
});

if (app.get('env') === 'development') {
    app.use(errorHandler());
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
    console.log('✔ Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
