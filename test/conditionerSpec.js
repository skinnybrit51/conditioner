var _ = require('underscore'),
    expect = require('chai').expect,
    Conditioner = require('conditioner');

describe('Conditioner', function () {

    beforeEach(function () {
        this.conditioner = new Conditioner();
    });

    it('Should have default options for percent', function () {
        var percent = this.conditioner.percent;
        var options = percent.options;
        expect(_.keys(options)).to.have.length(9);
        expect(options.prefixSymbol).to.equal('');
        expect(options.suffixSymbol).to.equal('%');
        expect(options.decimalSymbol).to.equal('.');
        expect(options.decimalDigitAmount).to.equal(2);
        expect(options.defaultValue).to.equal(null);
        expect(options.groupIntervalAmount).to.equal(3);
        expect(options.groupSymbol).to.equal(',');
        expect(options.negativePrefixSymbol).to.equal('-');
        expect(options.negativeSuffixSymbol).to.equal('');
    });

    it('Should have default options for cost', function () {
        var cost = this.conditioner.cost;
        var options = cost.options;
        expect(_.keys(options)).to.have.length(9);
        expect(options.prefixSymbol).to.equal('$');
        expect(options.suffixSymbol).to.equal('');
        expect(options.decimalSymbol).to.equal('.');
        expect(options.decimalDigitAmount).to.equal(2);
        expect(options.defaultValue).to.equal(null);
        expect(options.groupIntervalAmount).to.equal(3);
        expect(options.groupSymbol).to.equal(',');
        expect(options.negativePrefixSymbol).to.equal('-');
        expect(options.negativeSuffixSymbol).to.equal('');
    });

    it('Should have default options for date', function () {
        var date = this.conditioner.date;
        var options = date.options;
        expect(_.keys(options)).to.have.length(3);
        expect(options.rawFormat).to.equal('YYYY-MM-DD');
        expect(_.keys(options.inputFormats)).to.have.length(1);
        expect(options.inputFormats[0]).to.equal('MM/DD/YYYY');
        expect(options.displayFormat).to.equal('MM/DD/YYYY');
    });
});
