var _ = require('underscore'),
    BaseNumber = require('./baseNumber');

var DEFAULT_OPTIONS = {
    percent: {

        suffixSymbol: '%'
    },
    cost: {
        prefixSymbol: '$'
    }
};

var conditioner = function (options) {
    options = _.defaults(options || {}, DEFAULT_OPTIONS);
    this._cost = new BaseNumber(options.cost);
    this._percent = new BaseNumber(options.percent);
};

conditioner.prototype = {

    constructor: conditioner,

    get cost() {
        return this._cost;
    },

    get percent() {
        return this._percent;
    }
};

module.exports = conditioner;