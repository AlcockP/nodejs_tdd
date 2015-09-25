var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var assert = chai.assert;
chai.should();
chai.use(sinonChai);

describe("Catalogue Service", function() {
    it("should return default products for a location with no additional products", function() {
        var catalogueService = require('../../lib/Services/CatalogueService'),
            retrievedProducts = catalogueService.getProducts('-1');

        assert.equal(retrievedProducts.categories.length, 1);
        assert.equal(retrievedProducts.categories[0].title, "News");
    });

    it("should return an enriched products list for a location with additional products", function() {
        var catalogueService = require('../../lib/Services/CatalogueService'),
            retrievedProducts = catalogueService.getProducts('1');

        assert.equal(retrievedProducts.categories.length, 2);
        assert.equal(retrievedProducts.categories[0].title, "News");
        assert.equal(retrievedProducts.categories[1].title, "Sports");
        assert.equal(retrievedProducts.categories[1].products.length, 2);
        assert.equal(retrievedProducts.categories[1].products[0].title, 'Arsenal TV');
        assert.equal(retrievedProducts.categories[1].products[1].title, 'Chelsea TV');
    });
});