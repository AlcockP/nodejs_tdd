var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var LoginController = require("../lib/LoginController");
var expect = chai.expect;
var assert = chai.assert;
chai.should();
chai.use(sinonChai);

describe("Login Controller", function() {
    describe("Setting cookies", function() {
        it("should set the cookie if a location has been selected", function() {
            var mockResponse = { cookie: sinon.spy() },
                mockRequest = { body: { 'ddl-location': 'some-location'} },
                loginController = new LoginController(mockRequest, mockResponse);

            expect(mockResponse.cookie).to.have.been.calledWith('customerID', 'some-location');
        });

        it("should not set any new cookies if no location has been selected", function() {
            var mockResponse = { cookie: sinon.spy() },
                mockRequest = { body: { 'invalid-key': 'some-value'} },
                loginController = new LoginController(mockRequest, mockResponse);

            expect(mockResponse.cookie).not.to.have.been.called;
        });

        it("should redirect to the product selection page if a location has been set", function() {
            var mockResponse = { cookie: sinon.spy() },
                mockRequest = { body: { 'ddl-location': 'some-location'} },
                loginController = new LoginController(mockRequest, mockResponse);

            assert.equal(loginController.redirect.location, '/');
        });
    })
});