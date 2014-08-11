var BaseDate = require('baseDate'),
    expect = require('chai').expect;

describe('Date', function () {

    describe('When formatting', function () {

        it('Should return an empty string', function () {
            var baseDate = new BaseDate();
            expect(baseDate.format('')).to.equal('');
            expect(baseDate.format(null)).to.equal('');
        });

        it('Should format the date', function () {
            var baseDate = new BaseDate();
            expect(baseDate.format('2014-12-25')).to.equal('12/25/2014');
        });

    });

    describe('When parsing', function () {

        it('Should parse the date', function () {
            var baseDate = new BaseDate();
            expect(baseDate.parse('12/25/2014')).to.equal('2014-12-25');
            expect(baseDate.parse('')).to.equal('');
            expect(baseDate.parse(null)).to.equal(null);
        });

    });

    describe('When validating', function () {

        it('Should validate the date', function () {
            var baseDate = new BaseDate();
            expect(baseDate.validate('12/25/2014')).to.equal(true);
            expect(baseDate.validate('25/12/2014')).to.equal(false);
            expect(baseDate.validate('12 25 2014')).to.equal(false);
            expect(baseDate.validate('12-25-2014')).to.equal(false);

            expect(baseDate.validate([])).to.equal(false);
            expect(baseDate.validate(true)).to.equal(false);
            expect(baseDate.validate(false)).to.equal(false);
            expect(baseDate.validate({})).to.equal(false);
            expect(baseDate.validate('')).to.equal(false);
            expect(baseDate.validate(null)).to.equal(false);
            expect(baseDate.validate(1)).to.equal(false);

        });

    });
});
