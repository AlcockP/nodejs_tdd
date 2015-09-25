var locationService = require('./Services/CustomerLocationService');
var catalogueService = require('./Services/CatalogueService');

var ProductSelectionController = function(request, response) {
    this.layoutToRender = 'product-selection';
    if (!request.cookies || !request.cookies.customerID) {
        this.redirect = {
            location: '/login'
        };
        return;
    }

    var customerID = request.cookies.customerID,
        location = locationService.getLocation(customerID);

    if (!location) {
        this.redirect = {
            location: '/login'
        };
        return;
    }

    this.data = catalogueService.getProducts(location);
};

module.exports = ProductSelectionController;