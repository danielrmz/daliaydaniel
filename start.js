//
// Dalia y Daniel website. 
// Serves static pages
// 

var path     = require('path'),
    express  = require('express'),
    pjax     = require('express-pjax'), 
    expressLayouts = require('express3-ejs-layout'),
    crypto = require('crypto'),
    request = require("request")
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

var secure_pages = ["events.html","guestbook.html"];
var allowed_pwds = ["3a79c4535726547aa453d83dcc6435b0", "6d071901727aec1ba6d8e2497ef5b709", "cee8d6b7ce52554fd70354e37bbf44a2"];
var galleries = { "dates": "10151741057697935", "engaged": "10151741062062935" };
var access_token = "CAACEdEose0cBANY3D9sEoZCVUqaWeKTZARoOv6sYxZBgKil21PqiZC8sZCCO7K08052SRfboBWAn9Lh2lBw2HTcnZBqHl71vIj0EemYuFyOZBoAYmwRSZBXebiUSoyZAynmY1YEsZCpLOMZAHZC3BIKKXJFrJB5LTI1cWvX80SzNwhGiY4O8p4KZBpjHBbYHZC2oQe2kwZD";
var gallery_src = "https://graph.facebook.com/{0}/photos?fields=images&limit=50&method=GET&format=json&suppress_http_code=1&access_token="+access_token;
	
app.get('/', function(req, res) {
	res.render("home.html");
});

app.get('/:page', function(req, res) { 
	var page = req.params.page;
	page = page.replace(".html","") + ".html"; 

	if(!req.session.auth && secure_pages.indexOf(page) >= 0) {
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
	
	if(allowed_pwds.indexOf(sent) >= 0) {
		req.session.auth = true;
		redirectTo = redirectTo.replace(".html","") + ".html"; 

		res.redirect(redirectTo);
		return; 
	} else {
		error = "Error, intente de nuevo."
	}

	res.render("login.html", { callback: "", error: error } );	
});

app.get("/gallery/:page", function(req, res) { 
	var album_id = galleries[req.params.page] || "";

	if(!album_id) { res.send(null); return; }

	var url = gallery_src.replace("{0}",album_id);
	request.get(url, function(e, r, bodyy) { 
		res.send(bodyy);
	});
});
 

// Start Application

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
