//
// Dalia y Daniel website. 
// Serves static pages
// 

var path     = require('path'),
    express  = require('express'),
    pjax     = require('express-pjax'), 
    expressLayouts = require('express3-ejs-layout'),
    crypto   = require('crypto'),
    request  = require("request"),
    mongoose = require('mongoose'),
    mailgun  = require('mailgun').Mailgun,
    sanitize = require('validator').sanitize
    ;

var app     = express();
var mg      = new mailgun('key-88593f8y3mtme24udh-d1928q0mt8sj6');
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
 	app.set('layout', 'index.html');

 	mongoose.connect(process.env.MONGOHQ_URL);
});


// Standard view definition.

var Photo = mongoose.model("Photos", { album: String, list: mongoose.Schema.Types.Mixed });
var Guestbook = mongoose.model("Guestbook", { name: String, email: String, comment: String, date: { type: Date, default: Date.now }, hidden: { type: Boolean, default: false } });
var RSVP = mongoose.model("RSVP", {  });

var secure_pages = ["events.html","guestbook.html"];
var allowed_pwds = ["3a79c4535726547aa453d83dcc6435b0", "6d071901727aec1ba6d8e2497ef5b709", "cee8d6b7ce52554fd70354e37bbf44a2"];
var galleries = { "dates": "10151741057697935", "engaged": "10151741062062935" };
var access_token = "";
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

	Photo.findOne({"album": req.params.page }, function(err, album) { 
		if(!album) {
			var url = gallery_src.replace("{0}",album_id);
			request.get(url, function(e, r, bodyy) { 
				if(!bodyy || bodyy.error) { 
					return false; 
				}
				var a = new Photo({ album: req.params.page, list: bodyy });
				a.save(function(err) { if(err) { console.log(err); } });

				res.send(bodyy);
			});
		} else {
			 
			res.send(album.list);
		}
	});
	
	
});

app.get("/guestbook/list", function(req, res) { 
	Guestbook.find({ hidden: false }).sort('-date').select('name comment date').exec(function(err, results) { 
		res.send(results);
	});
});

app.post("/guestbook/new", function(req, res) { 
	comment = sanitize(req.body.comment).escape();

	var entry = new Guestbook({
		name: req.body.name,
		email: req.body.email,
		comment: comment
	});

	entry.save(function(err) { 
		if(err) { console.log(err); res.send(false); return; }

		mg.sendText('boda@daliaydaniel.com', 
			['Dalia y Daniel <boda@daliaydaniel.com>'], 
			'Nueva firma en Dalia y Daniel', 
			"Una persona escribio en el libro de firmas:\n\nNombre: " + req.body.name + " \nCorreo: " + req.body.email + " \nMensaje: " + req.body.comment,
			'no-reply@daliaydaniel.com', 
			{},
			function(err) {
    			if (err) console.log('Oh noes: ' + err);
    			else     console.log('Success sending the email.');
			}
		);

		res.send('{ "name": "'+req.body.name+'", "comment": "'+req.body.email+'" }');
	});
});

// Start Application

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
