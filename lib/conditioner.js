var _ = require('underscore'),
    BaseNumber = require('./baseNumber'),
    BaseDate = require('./baseDate');

var DEFAULT_OPTIONS = {
    percent: {

        suffixSymbol: '%'
    },
    cost: {
        prefixSymbol: '$'
    },
    date: {

    }
};

var conditioner = function (options) {
    options = _.defaults(options || {}, DEFAULT_OPTIONS);
    this._cost = new BaseNumber(options.cost);
    this._percent = new BaseNumber(options.percent);
    this._date = new BaseDate(options.date);
};

conditioner.prototype = {

    constructor: conditioner,

    get cost() {
        return this._cost;
    },

    get percent() {
        return this._percent;
    },

    get date() {
        return this._date;
    }
};

module.exports = conditioner;