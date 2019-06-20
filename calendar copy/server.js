
var express = require('express');
//app=express().use(express.static(_dirname+'/'));
//http=require('http').server(app);
//io=require('socket.io')(http);
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoDB = require('./src/mongoDB');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//app.get('/', function (req, res) {
//  res.send('Hello World!')
//})

app.get('/', function(req, res) {
	res.render('pages/signin');
});

app.post('/signin', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var user = {
		'username' : username,
		'password' : password 
	}
	var callback = function(isSuccess){
		if(isSuccess){
		   res.render('pages/month');
        } else {
           res.render('pages/signin', {'msg': 'invalid username or password'});
        }
	}
	mongoDB.find('user', user, callback) ;
});

app.get('/event', function(req, res){
	res.render('pages/addevent');
});

app.post('/add-event', function(req, res){
	var username = req.body.username ;
	var time = req.body.time ;
	var content = req.body.content ;
	
	var event = {
		'username' : username,
		'time' : time ,
		'content' : content
	}
	mongoDB.insert('event', event);
	res.send('add event success');
});

//app.get('/add-event', function(req, res)
//{
//	res.render('pages/events');
//}

app.get('/events', function(req, res){
	var username = req.param('username');
	if(!username){
		res.send("username is null");
		return ;
	}
	var callback = function(events){
		if(!events){
			res.send('this username has no events: ' + username);
		} else {
			res.render('pages/events', {'events': events});
		}
	}
	mongoDB.finds('event', {'username': username}, callback)
});

app.get('/month', function(req, res) {
	var m = req.param('m');
	res.render('pages/month', {'m' : m});
});

app.get('/login', function(req, res) {
	res.render('pages/login');
});

app.get('/TwoButton', function(req,res){
    res.render('pages/TwoButton');
});

app.get('/spring', function(req,res){
    res.render('pages/spring',{});
});

app.get('/February', function(req,res){
    res.render('pages/February');
});

var port = 3000;
var server = app.listen(port, function() {
	console.log("Node running at http://%s:%s", "127.0.0.1", port)
});