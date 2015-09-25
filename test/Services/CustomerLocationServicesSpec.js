var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var assert = chai.assert;
chai.should();
chai.use(sinonChai);

describe("Customer Location Service", function() {
    it("should return a location ID if the location is found", function() {
        var customerLocationService = require('../../lib/Services/CustomerLocationService');
        assert.equal(customerLocationService.getLocation('LONDON-USER'), '1');
    });

    it("should return null if the location is not found", function() {
        var customerLocationService = require('../../lib/Services/CustomerLocationService');
        assert.equal(customerLocationService.getLocation('invalid-location'), null);
    });
});