var express = require("express");
var app = express();
var path = require('path');

app.use(express.static(__dirname));

//app.use(express.logger());
//app.get('/', function(request, response) { response.send('Hello world!'); });

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
