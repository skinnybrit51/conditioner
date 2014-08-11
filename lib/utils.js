module.exports = {
    isNumber: function (obj) {
        return typeof obj === 'number' || !!( obj === 0 ||
            obj && obj.toExponential && obj.toFixed );
    },

    isString: function (obj) {
        return typeof(obj) === 'string';
    },

    escapeRegExp: function (string) {
        // escape special characters - function defined on MDN Regular Expressions
        return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
    }

};