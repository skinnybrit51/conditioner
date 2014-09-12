var moment = require('moment'),
    _ = require('underscore');

var DEFAULT_OPTIONS = {
    rawFormat: 'YYYY-MM-DD',
    inputFormats: ['MM/DD/YYYY'],
    displayFormat: 'MM/DD/YYYY'
};

var BaseDate = function (options) {
    this.options = _.defaults(options || {}, DEFAULT_OPTIONS);
};

BaseDate.prototype = {
    constructor: BaseDate,

    format: function (value/*string*/, overrideOptions) {
        var options = this.options;

        if (overrideOptions != null && _.isObject(overrideOptions)) {
            options = _.defaults(overrideOptions, this.options);
        }

        if (value == null) {
            return '';
        }

        if (value.length === 0) {
            return '';
        }

        return moment(value, options.rawFormat, true).format(options.displayFormat);
    },

    parse: function (value/*string*/, overrideOptions) {
        var options = this.options;

        if (overrideOptions != null && _.isObject(overrideOptions)) {
            options = _.defaults(overrideOptions, this.options);
        }

        if (value == null) {
            return null;
        }

        if (value.length === 0) {
            return '';
        }

        return moment(value, options.inputFormats, true).format(options.rawFormat);
    },

    validate: function (value/*string*/, overrideOptions) {
        var options = this.options;

        if (overrideOptions != null && _.isObject(overrideOptions)) {
            options = _.defaults(overrideOptions, this.options);
        }
        return moment(value, options.inputFormats, true).isValid();
    }
};
module.exports = BaseDate;
