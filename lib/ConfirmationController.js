var ProductSelectionController = function(request, response) {
    this.layoutToRender = 'confirmation';
    if (!request.cookies || !request.cookies.customerID) {
        this.redirect = {
            location: '/login'
        };
        return;
    }

    this.data = {};
    this.data.customerID = request.cookies.customerID
    this.data.subscriptions = [];
    if(request.body) {
        var subscriptionCount = Object.keys(request.body).length;
        for(var i = 0; i < subscriptionCount; i++) {
            this.data.subscriptions.push(request.body[i.toString()]);
        }
    }
};

module.exports = ProductSelectionController;