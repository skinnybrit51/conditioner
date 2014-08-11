var moment = require('moment'),
    _ = require('underscore');

var DEFAULT_OPTIONS = {
    RAW_FORMAT: 'YYYY-MM-DD',
    INPUT_FORMATS: ['MM/DD/YYYY'],
    DISPLAY_FORMAT: 'MM/DD/YYYY'
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

        return moment(value, options.RAW_FORMAT, true).format(options.DISPLAY_FORMAT);
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

        return moment(value, options.INPUT_FORMATS, true).format(options.RAW_FORMAT);
    },

    validate: function (value/*string*/, overrideOptions) {
        var options = this.options;

        if (overrideOptions != null && _.isObject(overrideOptions)) {
            options = _.defaults(overrideOptions, this.options);
        }
        return moment(value, options.INPUT_FORMATS, true).isValid();
    }
};
module.exports = BaseDate;
