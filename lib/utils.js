module.exports = {
    isNumber: function (obj) {
        return typeof obj === 'number' || !!( obj === 0 ||
            obj && obj.toExponential && obj.toFixed );
    }
};