var express = require('express');
var packageInfo = require('./package.json');
// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/' + process.env.TOKEN, function (req, res) {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', function (req, res) {
    res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT||5000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Web server started at http://%s:%s', host, port);
});

// var url = 'mongodb://localhost:27017/test';
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.");
//   db.close();
// });
// var mongoose = require('mongoose');
//
// var db = mongoose.connection;
//
// db.on('error', console.error);
// db.once('open', function() {
//   console.log("connection ok");
//   // Здесь создаём схемы и модели.
//   var providersSchema = new mongoose.Schema({
//       name: { type: String }
//       , chatID: Number
//     });
//
//     // Компиляция модели Providers с помощью ProvidersSchema в качестве структуры.
//     // Mongoose также создаёт для этих документов коллекцию под названием Providers.
//     var Providers = mongoose.model('Providers', providersSchema);
//     // var exmpl = new Providers({
//     //   name: 'Alex'
//     //   , chatID: '123444567'
//     // });
//
//     // exmpl.save(function(err, exmpl) {
//     //   if (err) return console.error(err);
//     //   // console.dir(exmpl);
//     // });
//     console.log("HERE");
//     Providers.find({ name: 'Alex' }, function(err, exmpl1) {
//       if (err) return console.error(err);
//       console.dir(exmpl1);
//     });
// });
//
// mongoose.connect('mongodb://localhost:27017/test');
