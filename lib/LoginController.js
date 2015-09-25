var locationsData = [{ name: "London", value: "LONDON-USER" }, { name: "Liverpool", value: "LIVERPOOL-USER" }];

var LoginController = function(request, response) {
    this.layoutToRender = 'login';
    if(request.body && request.body['ddl-location'] && request.body['ddl-location'] !== '') {
        response.cookie('customerID', request.body['ddl-location']);
        this.redirect = {
            "location": "/"
        };
        return;
    }

    this.data = {
        locations: locationsData
    }
};

module.exports = LoginController;