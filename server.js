// 
// NPM Package Dependencies
// 

var express = require("express");
var bodyParser = require("body-parser");


// EXPRESS Function Declaration

var app = express();

var PORT = process.env.PORT || 8080;

// body-parser
// extended == true (qs library); exitended == false (querystring library)
// http://jsonapi.org/format/ == requires use of the JSON API media type (application/vnd.api+json) for exchanging data.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// ROUTES

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTEN on PORT:8080

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
	
});