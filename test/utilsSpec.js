var expect = require('chai').expect,
    utils = require('utils');

describe('Utils', function () {

    it('Should validate whether an object is a number', function () {
        expect(utils.isNumber(null)).to.be.false;
        expect(utils.isNumber('asdasdasd')).to.be.false;
        expect(utils.isNumber(true)).to.be.false;
        expect(utils.isNumber({})).to.be.false;
        expect(utils.isNumber([])).to.be.false;
        expect(utils.isNumber(1)).to.be.true;
        expect(utils.isNumber(1.1)).to.be.true;
    });

    it('Should validate whether an object is a string', function () {
        expect(utils.isString(null)).to.be.false;
        expect(utils.isString('asdasdasd')).to.be.true;
        expect(utils.isString(true)).to.be.false;
        expect(utils.isString({})).to.be.false;
        expect(utils.isString([])).to.be.false;
        expect(utils.isString(1)).to.be.false;
        expect(utils.isString(1.1)).to.be.false;
    });
});