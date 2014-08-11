var _ = require('underscore'),
    expect = require('chai').expect,
    BaseNumber = require('baseNumber');

describe('Base Number', function () {

    it('Should attach default options to cost object', function () {
        var baseNumber = new BaseNumber();
        expect(_.keys(baseNumber.options)).to.have.length(9);
        expect(baseNumber.options.prefixSymbol).to.equal('');
        expect(baseNumber.options.suffixSymbol).to.equal('');
        expect(baseNumber.options.decimalSymbol).to.equal('.');
        expect(baseNumber.options.decimalDigitAmount).to.equal(2);
        expect(baseNumber.options.defaultValue).to.equal(null);
        expect(baseNumber.options.groupIntervalAmount).to.equal(3);
        expect(baseNumber.options.groupSymbol).to.equal(',');
        expect(baseNumber.options.negativePrefixSymbol).to.equal('-');
        expect(baseNumber.options.negativeSuffixSymbol).to.equal('');

        // changing the extra options should not affect default options
        baseNumber.format(1, {prefixSymbol: 'foo'});
        expect(baseNumber.options.prefixSymbol).to.equal('');
    });

    describe('When formatting', function () {
        it('Should return an empty string', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.format(null)).to.equal('');
            expect(baseNumber.format()).to.equal('');
            expect(baseNumber.format('asdasdasd')).to.equal('');
            expect(baseNumber.format(true)).to.equal('');
            expect(baseNumber.format(false)).to.equal('');
            expect(baseNumber.format({})).to.equal('');
            expect(baseNumber.format([])).to.equal('');
        });

        it('Should return an empty default value string', function () {
            var baseNumber = new BaseNumber();
            var extraOptions = {
                defaultValue: 0
            };
            expect(baseNumber.format(null, extraOptions)).to.equal('0.00');
            expect(baseNumber.format('asdasdasd', extraOptions)).to.equal('0.00');
            expect(baseNumber.format(true, extraOptions)).to.equal('0.00');
            expect(baseNumber.format({}, extraOptions)).to.equal('0.00');
            expect(baseNumber.format([], extraOptions)).to.equal('0.00');
        });

        it('Should display prefix symbol', function () {
            // no prefix currency symbol
            var baseNumber = new BaseNumber({
                currencyPrefixSymbol: ''
            });
            expect(baseNumber.format(1)).to.equal('1.00');

            // different prefix symbol
            expect(baseNumber.format(1, {prefixSymbol: '***'})).to.equal('***1.00');
        });

        it('Should display suffix symbol', function () {
            var baseNumber = new BaseNumber({
                prefixSymbol: '',
                suffixSymbol: '***'
            });
            expect(baseNumber.format(1)).to.equal('1.00***');
        });

        it('Should display decimal symbol', function () {
            var baseNumber = new BaseNumber({
                decimalSymbol: '***'
            });
            expect(baseNumber.format(1)).to.equal('1***00');
        });

        it('Should display decimal digit amount', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.format(1)).to.equal('1.00');
            expect(baseNumber.format(1, {decimalDigitAmount: 4})).to.equal('1.0000');
        });

        it('Should display group interval amount', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.format(1)).to.equal('1.00');
            expect(baseNumber.format(10)).to.equal('10.00');
            expect(baseNumber.format(100)).to.equal('100.00');
            expect(baseNumber.format(1000)).to.equal('1,000.00');
            expect(baseNumber.format(10000)).to.equal('10,000.00');
            expect(baseNumber.format(100000)).to.equal('100,000.00');
            expect(baseNumber.format(1000000)).to.equal('1,000,000.00');

            // change group interval
            baseNumber = new BaseNumber({
                groupIntervalAmount: 2
            });
            expect(baseNumber.format(1)).to.equal('1.00');
            expect(baseNumber.format(10)).to.equal('10.00');
            expect(baseNumber.format(100)).to.equal('1,00.00');
            expect(baseNumber.format(1000)).to.equal('10,00.00');
            expect(baseNumber.format(10000)).to.equal('1,00,00.00');
            expect(baseNumber.format(100000)).to.equal('10,00,00.00');
            expect(baseNumber.format(1000000)).to.equal('1,00,00,00.00');

        });

        it('Should display group symbol', function () {
            var baseNumber = new BaseNumber({
                groupSymbol: '***'
            });
            expect(baseNumber.format(1000)).to.equal('1***000.00');
        });

        it('Should display negative prefix symbol', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.format(-1)).to.equal('-1.00');
            expect(baseNumber.format(-1, {negativePrefixSymbol: '***'})).to.equal('***1.00');
        });

        it('Should display negative suffix symbol', function () {
            var baseNumber = new BaseNumber({
                negativeSuffixSymbol: '***'
            });
            expect(baseNumber.format(-1)).to.equal('-1.00***');
        });
    });

    describe('When reducing', function () {
        it('Should remove, prefixSymbol, suffixSymbol and groupIntervalSymbol', function () {
            var options = {
                prefixSymbol: 'foo',
                suffixSymbol: 'bar',
                groupSymbol: 'oi'

            };
            var baseNumber = new BaseNumber();
            expect(baseNumber._reduction('foo12345oi6oi7890bar', options)).to.equal('1234567890');

            options = {
                prefixSymbol: '$',
                suffixSymbol: '$',
                groupSymbol: '.'

            };
            baseNumber = new BaseNumber();
            expect(baseNumber._reduction('$12345.6.7890$', options)).to.equal('1234567890');

            options = {
                prefixSymbol: '*',
                suffixSymbol: '+',
                groupSymbol: '^'

            };
            baseNumber = new BaseNumber();
            expect(baseNumber._reduction('*12345^6^7890+', options)).to.equal('1234567890');
        });
    });

    describe('When negative', function () {

        it('Should recognize a negative number', function () {
            var baseNumber = new BaseNumber();
            var options = {
                negativePrefixSymbol: '-',
                negativeSuffixSymbol: ''
            };
            expect(baseNumber._isNegative('1', options)).to.be.false;
            expect(baseNumber._isNegative('-1', options)).to.be.true;
            options = {
                negativePrefixSymbol: '',
                negativeSuffixSymbol: '-'
            };
            expect(baseNumber._isNegative('1', options)).to.be.false;
            expect(baseNumber._isNegative('1-', options)).to.be.true;
            options = {
                negativePrefixSymbol: '(',
                negativeSuffixSymbol: ')'
            };
            expect(baseNumber._isNegative('(1', options)).to.be.false;
            expect(baseNumber._isNegative('1)', options)).to.be.false;
            expect(baseNumber._isNegative('(1)', options)).to.be.true;
        });

        it('Should remove, negativePrefixSymbol and negativeSuffixSymbol', function () {
            var options = {
                negativePrefixSymbol: 'foo',
                negativeSuffixSymbol: 'bar'

            };
            var baseNumber = new BaseNumber();
            expect(baseNumber._reductionNegative('foo1234567890bar', options))
                .to.equal('1234567890');
        });

    });

    describe('When parsing', function () {

        it('Should handle a non string value', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.parse(1.1)).to.equal(null);
            expect(baseNumber.parse(true)).to.equal(null);
            expect(baseNumber.parse([])).to.equal(null);
            expect(baseNumber.parse({})).to.equal(null);
        });

        it('Should handle an empty string to null', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.parse('')).to.equal(null);
        });

        it('Should extract number from string', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.parse('1')).to.equal(1);
            expect(baseNumber.parse('1.1')).to.equal(1.1);
            expect(baseNumber.parse('-1.1')).to.equal(-1.1);
            expect(baseNumber.parse('-1,000.1')).to.equal(-1000.1);
            expect(baseNumber.parse('1100.1254567')).to.equal(1100.1254567);
            expect(baseNumber.parse('1.')).to.equal(1);
            expect(baseNumber.parse('.01')).to.equal(0.01);

            baseNumber = new BaseNumber({
                prefixSymbol: '$',
                decimalSymbol: '***',
                groupSymbol: '&&&',
                negativePrefixSymbol: '(',
                negativeSuffixSymbol: ')'
            });
            expect(baseNumber.parse('$1')).to.equal(1);
            expect(baseNumber.parse('$1***1')).to.equal(1.1);
            expect(baseNumber.parse('$(1***1)')).to.equal(-1.1);
            expect(baseNumber.parse('$(1&&&000***1)')).to.equal(-1000.1);

            baseNumber = new BaseNumber({
                suffixSymbol: '$'
            });

            expect(baseNumber.parse('1$')).to.equal(1);
            expect(baseNumber.parse('1.1$')).to.equal(1.1);
            expect(baseNumber.parse('-1$')).to.equal(-1);
        });

    });

    describe('When validating', function () {

        it('Should be an invalid number', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.validate('')).to.equal(false);
            expect(baseNumber.validate(null)).to.equal(false);
            expect(baseNumber.validate([])).to.equal(false);
            expect(baseNumber.validate({})).to.equal(false);
            expect(baseNumber.validate(false)).to.equal(false);
            expect(baseNumber.validate(true)).to.equal(false);
            expect(baseNumber.validate(1)).to.equal(false);
            expect(baseNumber.validate(1.0)).to.equal(false);

            expect(baseNumber.validate('4$')).to.equal(false);
            expect(baseNumber.validate('1.1.1')).to.equal(false);
        });

        it('Should be a valid number', function () {
            var baseNumber = new BaseNumber();
            expect(baseNumber.validate('1')).to.equal(true);
            expect(baseNumber.validate('1.1')).to.equal(true);
            expect(baseNumber.validate('1.1111111')).to.equal(true);
            expect(baseNumber.validate('-1')).to.equal(true);
            expect(baseNumber.validate('-1.11111')).to.equal(true);
            expect(baseNumber.validate('1.')).to.equal(true);
            expect(baseNumber.validate('.1')).to.equal(true);
            expect(baseNumber.validate('1,000.00')).to.equal(true);
            expect(baseNumber.validate('1,00,0.00')).to.equal(true);
            expect(baseNumber.validate('1,00,0.00')).to.equal(true);

            baseNumber = new BaseNumber({prefixSymbol: '$'});
            expect(baseNumber.validate('$1')).to.equal(true);
            baseNumber = new BaseNumber({suffixSymbol: '$'});
            expect(baseNumber.validate('1$')).to.equal(true);
            baseNumber = new BaseNumber({decimalSymbol: '***'});
            expect(baseNumber.validate('1***5')).to.equal(true);
            baseNumber = new BaseNumber({groupSymbol: '***'});
            expect(baseNumber.validate('1***5')).to.equal(true);
            baseNumber = new BaseNumber({negativePrefixSymbol: '***'});
            expect(baseNumber.validate('***15')).to.equal(true);
            baseNumber = new BaseNumber({negativePrefixSymbol: '***'});
            expect(baseNumber.validate('15***')).to.equal(true);
        });

    });


});
