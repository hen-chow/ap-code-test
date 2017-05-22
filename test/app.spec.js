"use strict";

var chai = require("chai");
var expect = require("chai").expect;
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

var userKeys = ['firstName', 'lastName', 'email']

chai.use(chaiHttp);

// test GET /users path
describe("GET /users", function(){
  describe("if there are users in the system", function(){
    it('should get all the users', function(done){
      chai.request(app.listen()) // start the server for the test
        .get("/users")
        .end(function(err, res){
          if(err) {
            console.error(err);
          }
          // HTTP status should be 200
          expect(res.status).to.equal(200);

          // Response should be an object
          expect(res.body).to.be.a('object');

          // Response should contain a users array
          expect(res.body.users).to.be.a('array');
          done(); // close the server
        });
    });
  })
});

// test POST /user path
describe("POST /user", function(){
  describe("if first name is missing", function(){
    it('should return error if first name is missing', function(done){
      var user = {
        lastName: "Swift",
        email: "tswifty@swift.com"
      };
      chai.request(app.listen())
        .post("/user")
        .send(user)
        .end(function(err, res){
          if(err){
            console.error(err);
          }
          // HTTP status should be 400
          expect(res.status).to.equal(400);

          // Error message sent from server
          expect(res.text).to.equal('{"error":"User info is missing. Cannot create user"}');
          done();
        });
    });
  });

  describe("if last name is missing", function(){
    it('should return error if last name is missing', function(done){
      var user = {
        firstName: "Taylor",
        email: "tswifty@swift.com"
      };
      chai.request(app.listen())
        .post("/user")
        .send(user)
        .end(function(err, res){
          if(err) {
            console.error(err);
          }
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('{"error":"User info is missing. Cannot create user"}');
          done();
        });
    });
  });

  describe("if email is missing", function(){
    it("should return error if missing email", function(done){
      var user = {
        firstName: "Taylor",
        lastName: "Swift"
      };
      chai.request(app.listen())
        .post("/user")
        .send(user)
        .end(function(err, res){
          if(err){
            console.error(err);
          }
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('{"error":"User info is missing. Cannot create user"}');
          done();
        })
    })
  })

  describe("if first name, last name and email are supplied", function(){
    it("should POST and create a user", function(done){
      var user = {
        firstName: "Taylor",
        lastName: "Swift",
        email: "getswifty@tswifty.com"
      };
      chai.request(app.listen())
        .post("/user")
        .send(user)
        .end(function(err, res){
          if(err){
            console.error(err);
          }
          expect(res.status).to.equal(200);
          // Success message
          expect(res.text).to.equal('{"info":"User was successfully created"}');
          done();
      });
    })
  })

  describe("if body is not formatted correctly", function(){
    it("should return an error", function(done){
      var user = ["firstName", "Taylor", "lastName", "Swift", "email", "getswifty@tswifty.com"];
      chai.request(app.listen())
        .post("/user")
        .send(user)
        .end(function(err, res){
          if(err){
            console.error(err);
          }
          expect(res.status).to.equal(400);
          done();
        });
    });
  })
})
