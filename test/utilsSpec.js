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
});