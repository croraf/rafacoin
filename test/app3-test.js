{
    let mocha = require('mocha');
    var describe = mocha.describe;
    var it = mocha.it;
}

var assert = require('assert');


describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });

    describe('#indexOf()', function () {
        it('should return index when the value is present', function () {
            assert.equal(2, [1, 2, 3].indexOf(3));
        });
    });
});