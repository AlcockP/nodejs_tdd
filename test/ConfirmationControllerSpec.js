var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var ConfirmationController = require("../lib/ConfirmationController");
var expect = chai.expect;
var assert = chai.assert;
chai.should();
chai.use(sinonChai);

describe("Confirmation Controller", function() {
    describe("Checking for user ID", function() {
        it("should redirect to the login if no user cookie is set", function() {
            var mockRequest = {cookies: {}};
            var confirmationController = new ConfirmationController(mockRequest, {});
            assert.equal(confirmationController.redirect.location, '/login');
        });
    });

    describe("Setting the data", function() {
        it('should set the customer ID for the view', function() {
            var mockRequest = {cookies: {customerID: 'some-id'}},
                confirmationController = new ConfirmationController(mockRequest, {});

            assert.equal(confirmationController.redirect, null);
            assert.equal(confirmationController.data.customerID, 'some-id');
        });

        it("should return an empty array if no subscriptinos where posted", function() {
            var mockRequest = {cookies: {customerID: 'some-id'}},
                confirmationController = new ConfirmationController(mockRequest, {});

            assert.equal(confirmationController.redirect, null);
            assert.equal(Array.isArray(confirmationController.data.subscriptions), true);
            assert.equal(confirmationController.data.subscriptions.length, 0);
        });

        it('should set the subscriptions correctly', function() {
            var mockRequest = {
                    cookies: {customerID: 'some-id'}, 
                    body: {
                        '0': 'first subscription',
                        '1': 'second subscription',
                        '2': 'third subscription',
                    }
                },
                confirmationController = new ConfirmationController(mockRequest, {});

            assert.equal(confirmationController.redirect, null);
            assert.equal(Array.isArray(confirmationController.data.subscriptions), true);
            assert.equal(confirmationController.data.subscriptions.length, 3);
            assert.equal(confirmationController.data.subscriptions[0], 'first subscription');
            assert.equal(confirmationController.data.subscriptions[1], 'second subscription');
            assert.equal(confirmationController.data.subscriptions[2], 'third subscription');
        });
    });
});