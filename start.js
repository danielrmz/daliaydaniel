
var path     = require('path'),
    express  = require('express'),
    pjax     = require('express-pjax'), 
    expressLayouts = require('express3-ejs-layout'),
    crypto = require('crypto');
    ;

var app     = express();

// Configuration

app.configure(function() {
	app.use(pjax());  
	app.use(expressLayouts);
	app.use(express.static(__dirname));
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.cookieSession({ secret: 'dd' }));
    
	app.engine('html', require('ejs').renderFile);
	
	app.set('views', __dirname + '/pages');
 	app.set('view engine', 'ejs');
 	app.set('layout', 'index.html')
});


// Standard view definition.

app.get('/:page', function(req, res) { 
	var page = req.params.page;
	page = page.replace(".html","") + ".html"; 

	if(!req.session.auth && page == "gallery.html") {
		res.render("login.html", { callback: page, error: "" });
		return;
	}



	res.renderPjax(page,{ callback: "", error: "" }); 
}); 

app.get("/login", function(req, res) {
	res.render("login.html", { callback: "", error: "" });	
});

app.post("/login", function(req, res) {
	var sent = crypto.createHash('md5').update(req.body.pwd).digest("hex");
	var redirectTo = req.body.returnTo || "home";
	if(redirectTo == "login") { redirectTo = "home"; }
	
	if(sent == "3a79c4535726547aa453d83dcc6435b0" || sent == "6d071901727aec1ba6d8e2497ef5b709"
		|| sent == "cee8d6b7ce52554fd70354e37bbf44a2") {
		req.session.auth = true;
		redirectTo = redirectTo.replace(".html","") + ".html"; 

		res.redirect(redirectTo);
		return; 
	} else {
		error = "Error, intente de nuevo."
	}

	res.render("login.html", { callback: "", error: error } );	
});

app.get('/', function(req, res) {
	res.render("home.html");
});

// Start Application

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
