var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var ProductSelectionController = require("../lib/ProductSelectionController");
var expect = chai.expect;
var assert = chai.assert;
chai.should();
chai.use(sinonChai);

describe("Product Selection Controller", function() {
    describe("Check for cookie", function() {
        it("should set a redirect attribute to be 'login' if no cookie is found", function() {
            var mockRequest = {cookies: {}};
            var productSelectionController = new ProductSelectionController(mockRequest, {});
            assert.equal(productSelectionController.redirect.location, '/login');
        });
    });

    describe("Get the location", function() {
        var customerLocationService = require('../lib/Services/CustomerLocationService');

        afterEach(function() {
            customerLocationService.getLocation.restore();
        });

        it("should set the redirection attribute if no valid customerID was found", function() {
            sinon.stub(
                customerLocationService,
                'getLocation', 
                function() { return null; }
            );
            var mockRequest = {cookies: {customerID: 'invalid-ID'}};
            var productSelectionController = new ProductSelectionController(mockRequest, {});
            assert.equal(productSelectionController.redirect.location, '/login');
        });

        it("should not set the redirection attribute if a valid location was found", function() {
            sinon.stub(
                customerLocationService,
                'getLocation', 
                function() { return 'valid-location'; }
            );
            var mockRequest = {cookies: {customerID: 'valid-ID'}};
            var productSelectionController = new ProductSelectionController(mockRequest, {});
            assert.equal(productSelectionController.redirect, undefined);
        });
    });

    describe("Get products for the location", function() {
        beforeEach(function() {
            sinon.stub(
                require('../lib/Services/CustomerLocationService'),
                'getLocation', 
                function() { return 'valid-location'; }
            );
        });

        afterEach(function() {
            require('../lib/Services/CustomerLocationService').getLocation.restore();
        });
        
        it('should call the catalogue service with the retrieved location', function() {
            var catalogueService = require('../lib/Services/CatalogueService');
            sinon.spy(
                catalogueService,
                'getProducts'
            );
            var mockRequest = {cookies: {customerID: 'invalid-location'}};
            var productSelectionController = new ProductSelectionController(mockRequest, {});
            expect(catalogueService.getProducts).to.have.been.calledWith('valid-location');

            catalogueService.getProducts.restore();
        });

        it('should set the data property to be the returned data from the CatalogueService', function() {
            var catalogueService = require('../lib/Services/CatalogueService');
            var mockProducts = {
                categories: [{
                    title: "Sports",
                    products: [{
                        title: "Arsenal TV"
                    }]
                }]
            };
            sinon.stub(
                catalogueService,
                'getProducts',
                function() { return mockProducts; }
            );
            var mockRequest = {cookies: {customerID: 'invalid-location'}};
            var productSelectionController = new ProductSelectionController(mockRequest, {});
            assert.equal(productSelectionController.data, mockProducts);

            catalogueService.getProducts.restore();
        });
    });
});