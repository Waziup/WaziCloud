var express = require('express');
var app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/local';
var not_csl;

app.get('', function (req, res) {
   console.log("Got a GET request for ... ");
   MongoClient.connect(url, function (err, db) {
   if (err) {
     console.log('Unable to connect to MongoDB server. Error:', err);
   } else {
     console.log('Connection established to', url);
     var collection = db.collection('users');

     collection.find().toArray(function (err, result) {
       if (err) {
         console.log(err);
       } else if (result.length) {
         console.log('Found:', result);
         not_csl = result;
       } else {
         console.log('No document found !');
       }
       db.close();
     });
   }
   });
   res.send(not_csl);
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Server listening at http://%s:%s", host, port)
})
