'use strict';

var _ = require('lodash');
var validator = require('validator');
var countries = require('../resources/countriesV2');

var notFound = function (res) {
    res.json(404, {
        status: 404,
        message: 'Not Found'
    });
};

exports.index = function (req, res) {
    res.send({message: 'Welcome to my world!'});
};

exports.getAll = function (req, res) {
    res.status(200).json(countries);
};

exports.name = function (req, res) {
    var countryName = req.params.countryName;
    console.log(countryName);
    var countryList = _.reduce(countries, function (result, country) {
        var nameList = _.map(country.translations, Function.call.bind("".toLowerCase));
        nameList.push(country.name.toLowerCase());
        nameList.push(country.nativeName.toLowerCase());
        if (validator.isIn(countryName.toLowerCase(), nameList)) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};

exports.callingCode = function (req, res) {
    var callingCode = req.params.callingCode;
    var countryList = _.reduce(countries, function (result, country) {
        if (validator.isIn(callingCode, country.callingCodes)) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};

exports.currency = function (req, res) {
    var currencyCode = req.params.currencyCode;
    var countryList = _.reduce(countries, function (result, country) {
        if (validator.isIn(currencyCode.toUpperCase(), _.map(country.currencies, 'code'))) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};

exports.region = function (req, res) {
    var regionName = req.params.regionName;
    var countryList = _.reduce(countries, function (result, country) {
        if (country.region.toLowerCase() === regionName.toLowerCase()) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};

exports.subregion = function (req, res) {
    var subregionName = req.params.subregionName;
    var countryList = _.reduce(countries, function (result, country) {
        if (country.subregion.toLowerCase() === subregionName.toLowerCase()) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};
