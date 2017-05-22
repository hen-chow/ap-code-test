# README

# TITLE: Autopilot code test submission - Hen Chow

# Overview
Submission for code test to use test-driven development to create a simple web server. A GET "/users" and a POST "/user" end points were created.

# Installation
Clone or download from Github repository: https://github.com/hen-chow/ap-code-test

Required to run the following npm modules:
```
npm install express
npm install mocha
npm install chai
npm install body-parser
npm install chai-http
```

To start server:
```
node app.js
```

# Tests  
The following tests were written to test the 2 end points.
- When a GET request is made to the "/users" end point, if there are users in the system, a users object should be returned
- When a POST request is made to the "/user" end point with first name missing, it should return an error
- When a POST request is made to the "/user" end point with last name missing, it should return an error
- When a POST request is made to the "/user" end point with email missing, it should return an error
- When a POST request is made to the "/user" end point with first name, last name and email supplied, it should POST and create a user
- When a POST request is made to the "/user" end point with incorrect formatted request body, it should return an error

## How to run the test suite
To run test suite:
```
npm test
```

For manual test through cURL:
```
curl -i http://localhost:3000/users

curl -X POST -d '{"firstName":"John", "lastName":"Lennon", "email":"beatles4va@lovemusic.com"}' http://localhost:3000/user --header "Content-Type:application/json"

curl -X POST -d '{"firstName":"John", "email":"test@email.com"}' http://localhost:3000/user --header "Content-Type:application/json"
```

## Specifications
* System dependencies
- body-parser
- chai
- chai-http
- express
- mocha
# ap-code-test
