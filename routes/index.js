var express = require("express");
const User = require("../core/user");
var router = express.Router();

const user = new User();

/* GET index page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

/* GET home page. */
router.get("/home", function(req, res, next) {
  res.send("welcome");
});

// Post login data
router.post("/login", function(req, res, next) {
  user.login(req.body.username, req.body.password, function(result) {
    if (result) {
      res.send("Logged in as: " + result.username);
    } else {
      res.send("Invalid password/ username !");
    }
  });
});

// Post login register
router.post("/register", function(req, res, next) {
  let userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password
  };

  user.create(userInput, function(lastId) {
    if (lastId) {
      res.send("Welcome" + userInput.username);
    } else {
      console.log("Error Creating a new user");
    }
  });
});

module.exports = router;
