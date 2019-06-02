var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/techMania', {useNewUrlParser: true});
db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error..."));
db.once('open', function callback() {
    console.log("techMania db opened!")
});

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});


app.get('*', function(req, res){
    res.render('index', {user: "Debobrata",title:"Homepage"});
});

var port = 3030;
app.listen(port);
console.log('Lisenting on port ' + port + '...');
