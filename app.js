var express = require('express'),
    exphbs = require('express-handlebars'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    ProductSelectionController = require('./lib/ProductSelectionController'),
    LoginController = require('./lib/LoginController'),
    ConfirmationController = require('./lib/ConfirmationController');
    React = require('react/addons'),
    app = express(),
    port = 3002;

app.use(express.static(__dirname + '/webapp/static'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/webapp/views/layouts');
app.engine('handlebars', exphbs({layoutsDir: __dirname + '/webapp/views/layouts', defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.get('/', handleIndexRequest);
app.use('/login', handleLoginRequest);
app.use('/confirmation', handleConfirmationRequest);

function handleIndexRequest(request, response) {
    var productSelectionController = new ProductSelectionController(request, response);
    if (productSelectionController.redirect) {
        return response.redirect(productSelectionController.redirect.location);
    }
    var reactHtml = React.renderToString(
        React.createFactory(require('./webapp/views/components/ProductSelection'))({data: productSelectionController.data})
    );
    response.render(
        productSelectionController.layoutToRender, 
        {reactOutput: reactHtml, data: JSON.stringify(productSelectionController.data)}
    );
};

function handleLoginRequest(request, response) {
    var loginController = new LoginController(request, response);
    if (loginController.redirect) {
        return response.redirect(loginController.redirect.location);
    }
    var reactHtml = React.renderToString(
        React.createFactory(require('./webapp/views/login'))({data: loginController.data})
    );
    response.render(
        loginController.layoutToRender, 
        {reactOutput: reactHtml}
    );
};

function handleConfirmationRequest(request, response) {
    var confirmationController = new ConfirmationController(request, response);
    if (confirmationController.redirect) {
        return response.redirect(confirmationController.redirect.location);
    }
    var reactHtml = React.renderToString(
        React.createFactory(require('./webapp/views/confirmation'))({data: confirmationController.data})
    );
    response.render(
        confirmationController.layoutToRender, 
        {reactOutput: reactHtml}
    );
};

app.listen(port, function() {
  console.log('Listening on port %d', port);
});