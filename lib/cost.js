var _ = require('underscore'),
    utils = require('./utils');

var DEFAULT_OPTIONS = {
    currencyPrefixSymbol: '$',
    currencySuffixSymbol: '',
    decimalSymbol: '.',
    decimalDigitAmount: 2,
    defaultValue: null,
    groupIntervalAmount: 3,
    groupSymbol: ',',
    negativePrefixSymbol: '-',
    negativeSuffixSymbol: ''
};

var cost = function (options) {
    this.options = _.defaults(options || {}, DEFAULT_OPTIONS);
};

cost.prototype = {
    constructor: cost,

    format: function (value/*string*/, extraOptions) {

        var options = this.options;

        if (extraOptions != null && _.isObject(extraOptions)) {
            options = _.defaults(extraOptions, this.options);
        }

        if (!utils.isNumber(value)) {

            if (!utils.isNumber(options.defaultValue)) {
                return '';
            }
            value = options.defaultValue;
        }

        var isNegative = value < 0;

        if (isNegative) {
            // flip value to positive
            value = value * -1;
        }

        var str = value.toFixed(options.decimalDigitAmount);

        // split str by decimal place
        var split = str.split('.');

        // add grouping interval symbol
        var reverse = split[0].split('').reverse();
        for (var index = options.groupIntervalAmount; index < reverse.length;
             index += options.groupIntervalAmount) {
            reverse.splice(index, 0, options.groupSymbol);
            index++;
        }
        str = reverse.reverse().join('') + options.decimalSymbol + split[1];

        // add negative symbols
        if (isNegative) {
            str = options.negativePrefixSymbol + str + options.negativeSuffixSymbol;
        }

        return options.currencyPrefixSymbol + str + options.currencySuffixSymbol;
    },

    parse: function (value/*string*/) {
        return value;
    },

    validate: function (value/*string*/) {
        return value.length;
    }

};

module.exports = cost;
