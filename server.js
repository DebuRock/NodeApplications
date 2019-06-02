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

if(env === "development"){
    mongoose.connect('mongodb://localhost/techMania', {useNewUrlParser: true});
}else{
    mongoose.connect('mongodb+srv://debobratap:Debukgec1991@cluster0-bjwzh.mongodb.net/TechMania?retryWrites=true', {useNewUrlParser: true});
};

db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error..."));
db.once('open', function callback() {
    console.log("TechMania db opened!")
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);

var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});


app.get('*', function(req, res){
    res.render('index', {mongoMessage});
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Lisenting on port ' + port + '...');
