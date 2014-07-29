var _ = require('underscore'),
    expect = require('chai').expect,
    Cost = require('cost');

describe('Cost', function () {

    it('Should attach default options to cost object', function () {
        var cost = new Cost();
        expect(_.keys(cost.options)).to.have.length(9);
        expect(cost.options.currencyPrefixSymbol).to.equal('$');
        expect(cost.options.currencySuffixSymbol).to.equal('');
        expect(cost.options.decimalSymbol).to.equal('.');
        expect(cost.options.decimalDigitAmount).to.equal(2);
        expect(cost.options.defaultValue).to.equal(null);
        expect(cost.options.groupIntervalAmount).to.equal(3);
        expect(cost.options.groupSymbol).to.equal(',');
        expect(cost.options.negativePrefixSymbol).to.equal('-');
        expect(cost.options.negativeSuffixSymbol).to.equal('');

        // changing the extra options should not affect default options
        cost.format(1, {currencyPrefixSymbol: 'foo'});
        expect(cost.options.currencyPrefixSymbol).to.equal('$');
    });

    it('Should return an empty string', function () {
        var cost = new Cost();
        expect(cost.format(null)).to.equal('');
        expect(cost.format('asdasdasd')).to.equal('');
        expect(cost.format(true)).to.equal('');
        expect(cost.format({})).to.equal('');
        expect(cost.format([])).to.equal('');
    });

    it('Should return an empty default value string', function () {
        var cost = new Cost();
        var extraOptions = {
            defaultValue: 0
        };
        expect(cost.format(null, extraOptions)).to.equal('$0.00');
        expect(cost.format('asdasdasd', extraOptions)).to.equal('$0.00');
        expect(cost.format(true, extraOptions)).to.equal('$0.00');
        expect(cost.format({}, extraOptions)).to.equal('$0.00');
        expect(cost.format([], extraOptions)).to.equal('$0.00');
    });

    it('Should display prefix currency symbol', function () {
        // no prefix currency symbol
        var cost = new Cost({
            currencyPrefixSymbol: ''
        });
        expect(cost.format(1)).to.equal('1.00');

        // different currency symbol
        expect(cost.format(1, {currencyPrefixSymbol: '***'})).to.equal('***1.00');
    });

    it('Should display suffix currency symbol', function () {
        var cost = new Cost({
            currencyPrefixSymbol: '',
            currencySuffixSymbol: '***'
        });
        expect(cost.format(1)).to.equal('1.00***');
    });

    it('Should display decimal symbol', function () {
        var cost = new Cost({
            decimalSymbol: '***'
        });
        expect(cost.format(1)).to.equal('$1***00');
    });

    it('Should display decimal digit amount', function () {
        var cost = new Cost();
        expect(cost.format(1)).to.equal('$1.00');
        expect(cost.format(1, {decimalDigitAmount: 4})).to.equal('$1.0000');
    });

    it('Should display group interval amount', function () {
        var cost = new Cost();
        expect(cost.format(1)).to.equal('$1.00');
        expect(cost.format(10)).to.equal('$10.00');
        expect(cost.format(100)).to.equal('$100.00');
        expect(cost.format(1000)).to.equal('$1,000.00');
        expect(cost.format(10000)).to.equal('$10,000.00');
        expect(cost.format(100000)).to.equal('$100,000.00');
        expect(cost.format(1000000)).to.equal('$1,000,000.00');

        // change group interval
        cost = new Cost({
            groupIntervalAmount: 2
        });
        expect(cost.format(1)).to.equal('$1.00');
        expect(cost.format(10)).to.equal('$10.00');
        expect(cost.format(100)).to.equal('$1,00.00');
        expect(cost.format(1000)).to.equal('$10,00.00');
        expect(cost.format(10000)).to.equal('$1,00,00.00');
        expect(cost.format(100000)).to.equal('$10,00,00.00');
        expect(cost.format(1000000)).to.equal('$1,00,00,00.00');

    });

    it('Should display group symbol', function () {
        var cost = new Cost({
            groupSymbol: '***'
        });
        expect(cost.format(1000)).to.equal('$1***000.00');
    });

    it('Should display negative prefix symbol', function () {
        var cost = new Cost();
        expect(cost.format(-1)).to.equal('$-1.00');
        expect(cost.format(-1, {negativePrefixSymbol: '***'})).to.equal('$***1.00');
    });

    it('Should display negative suffix symbol', function () {
        var cost = new Cost({
            negativeSuffixSymbol: '***'
        });
        expect(cost.format(-1)).to.equal('$-1.00***');
    });
});
