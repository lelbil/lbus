var express = require('express');
var mongoose = require('mongoose');
var isUrl = require('is-url');

var Redir = require('./redir');

var app = express();

app.get('/', function(req, res) {
	//res.end("use the path '/goog' to go to google");	
	res.sendFile(__dirname + "/index.html")
});

app.get('/new/*', function(req, res) {
	var url = req.url.slice(5);
	if(!isUrl){
		res.json({"error": "not a valid url", "fail": true}); return;
	}

	var rand = Math.floor(Math.random() * 10000 + 1);
	var obj = {
			num: rand, 
			originalUrl: url,
			shortUrl: "https://lbus.herokuapp.com/" + rand
		};
	var thisRedir = new Redir(obj);
	thisRedir.save(function(err){
		if (err) {
			console.log(err); 
			res.json({"error": "db saving error", "fail": true})
		}
		console.log("Redirection saved succefully");
		res.json(obj); return;
	})
});

app.get('/:num', function(req, res){
	var numParam = parseInt(req.params.num);
	Redir.findOne({"num": numParam}, function(err, data){
		if (err) {
			console.error("there has been an error");
			res.end("you should enter only digits")
			//throw err;
		}
		if (!data) {
			res.end("no such short link"); return;
		}
		res.redirect(data.originalUrl);
	})
})


app.listen(process.env.PORT || 8080);
