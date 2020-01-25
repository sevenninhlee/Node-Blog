var express = require('express');
var config = require("config");
var bodyParser =  require("body-parser");
var session = require("express-session");

var app = express();

// body-parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// view files .ejs
app.set("views",__dirname + "/apps/views");
app.set("view engine", "ejs");

// static
app.use("/static", express.static(__dirname + "/public"));

// host and port
var host = config.get("server.host");
var port = config.get("server.port");

var controllers = require(__dirname + "/apps/controllers");
app.use(controllers);

app.listen(port, host, function(err, res) {
    console.log("Server is running on port",port);
})
