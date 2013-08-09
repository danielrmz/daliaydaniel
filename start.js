
var path     = require('path'),
    express  = require('express'),
    pjax     = require('express-pjax'), 
    expressLayouts = require('express3-ejs-layout')
    ;

var app     = express();

// Configuration

app.configure(function() {
	app.use(pjax());  
	app.use(expressLayouts);
	app.use(express.static(__dirname));
	app.use(express.logger());
	app.engine('html', require('ejs').renderFile);
	
	app.set('views', __dirname + '/pages');
 	app.set('view engine', 'ejs');
 	app.set('layout', 'index.html')
});


// Standard view definition.

app.get('/:page', function(req, res) { 
	var page = req.params.page;
	page = page.replace(".html","") + ".html"; 

	res.renderPjax(page); 
}); 

app.get('/', function(req, res) {
	res.render("home.html");
});

// Start Application

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
