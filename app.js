var express = require('express');

var app = express(); // execute the express module
var bodyParser = require('body-parser');
var port = 3000;


app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

var users = [
  // {
  //   "firstName": "Michael",
  //   "lastName": "Jackson",
  //   "email": "michael@jackson.com"
  // }, {
  //   "firstName": "Justin",
  //   "lastName": "Bieber",
  //   "email": "justinlovesmonkeys@hotmail.com"
  // }
]

/* GET request for Read */
app.get("/", function(req, res){
  res.json({hello: "World"});
});

app.get("/users", function(req, res){
  res.set({'Content-Type': 'application/json'});
  var responseObj = {
    users: users
  }
  res.json(responseObj);
});

/* POST request to Create */
app.post("/user", function(req, res){

  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    res.status(400).json({error: 'User info is missing. Cannot create user'});

  } else if (req.body.firstName && req.body.lastName && req.body.email){
    users.push(req.body);
    res.json({info: 'User was successfully created'});

  } else {
      res.status(400).json({error: 'Badly formatted request'});
  }
});

// set up condition to ensure that we're not doubling up listening at port 3000
if (!module.parent){
  app.listen(port, function(){
    console.log("Application listening at localhost://" + port);
  });
};

// export this module for testing
module.exports = app;
