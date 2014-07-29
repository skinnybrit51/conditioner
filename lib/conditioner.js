var Cost = require('./cost');

var conditioner = function (options) {
    this._cost = new Cost(options.cost);
};

conditioner.prototype = {

    constructor: conditioner,

    cost: function () {

        return this._cost;
    }
};

module.exports = conditioner;