var _ = require('underscore'),
    utils = require('./utils');

var DEFAULT_OPTIONS = {
    prefixSymbol: '',
    suffixSymbol: '',
    decimalSymbol: '.',
    decimalDigitAmount: 2,
    defaultValue: null,
    groupIntervalAmount: 3,
    groupSymbol: ',',
    negativePrefixSymbol: '-',
    negativeSuffixSymbol: ''
};

var BaseNumber = function (options) {
    this.options = _.defaults(options || {}, DEFAULT_OPTIONS);
};

BaseNumber.prototype = {
    constructor: BaseNumber,

    format: function (value/*string*/, overrideOptions) {

        var options = this.options;

        if (overrideOptions != null && _.isObject(overrideOptions)) {
            options = _.defaults(overrideOptions, this.options);
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

        if (options.groupIntervalAmount != null && options.groupIntervalAmount > 0) {
            // add grouping interval symbol
            var reverse = split[0].split('').reverse();
            for (var index = options.groupIntervalAmount; index < reverse.length;
                 index += options.groupIntervalAmount) {
                reverse.splice(index, 0, options.groupSymbol);
                index++;
            }
            str = reverse.reverse().join('') + options.decimalSymbol + split[1];
        }

        // add negative symbols
        if (isNegative) {
            str = options.negativePrefixSymbol + str + options.negativeSuffixSymbol;
        }

        return options.prefixSymbol + str + options.suffixSymbol;
    },

    _reduction: function (value/*string*/, options) {
        // remove prefixSymbol
        // remove suffixSymbol
        // remove groupSymbol

        function replaceAll(string, find, replace) {
            return string.replace(new RegExp(utils.escapeRegExp(find), 'g'), replace);
        }

        value = replaceAll(value, options.prefixSymbol, '');
        value = replaceAll(value, options.suffixSymbol, '');
        value = replaceAll(value, options.groupSymbol, '');
        return value;
    },

    _reductionNegative: function (value/*string*/, options) {
        // remove negativeSymbol
        // remove negativeSymbol

        function replaceAll(string, find, replace) {
            return string.replace(new RegExp(utils.escapeRegExp(find), 'g'), replace);
        }

        value = replaceAll(value, options.negativePrefixSymbol, '');
        value = replaceAll(value, options.negativeSuffixSymbol, '');
        return value;
    },

    _isNegative: function (value/*string*/, options) {

        if (options.negativePrefixSymbol.length && !options.negativeSuffixSymbol.length) {
            return (value.charAt(0) === options.negativePrefixSymbol);
        }

        if (!options.negativePrefixSymbol.length && options.negativeSuffixSymbol.length) {
            return (value.charAt(value.length - 1) === options.negativeSuffixSymbol);
        }

        return (value.charAt(0) === options.negativePrefixSymbol) &&
            (value.charAt(value.length - 1) === options.negativeSuffixSymbol);
    },

    parse: function (value/*string*/, overrideOptions) {

        var options = this.options;

        if (overrideOptions != null && _.isObject(overrideOptions)) {
            options = _.defaults(overrideOptions, this.options);
        }

        if (!utils.isString(value) || value.length === 0) {
            return null;
        }

        // reduce the number from symbols
        value = this._reduction(value, options);
        var isNegative = this._isNegative(value, options);
        value = this._reductionNegative(value, options);

        // should now just be a number with decimal
        var split = value.split(options.decimalSymbol);
        value = split[0];

        if (split.length === 2) {
            value += '.' + split[1];
        }

        if (isNegative) {
            value = '-' + value;
        }

        return parseFloat(value);
    },

    validate: function (value/*string*/, overrideOptions) {

        var options = this.options;

        if (overrideOptions != null && _.isObject(overrideOptions)) {
            options = _.defaults(overrideOptions, this.options);
        }

        if (value == null || _.isObject(value) || _.isBoolean(value) || _.isNumber(value)) {
            return false;
        }

        if (value.length === 0) {
            return false;
        }

        // replace what ever is used as the decimal symbol with a period
        value = value.replace(options.decimalSymbol, '.');

        var cost_pattern = new RegExp('^\\d*\\.*\\d*$');
        value = this._reduction(value, options);
        value = this._reductionNegative(value, options);

        return cost_pattern.test(value);
    }

};

module.exports = BaseNumber;
