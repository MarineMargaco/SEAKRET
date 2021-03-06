var express = require("express");
const User = require("../core/user");
var router = express.Router();

const user = new User();

/* GET index page. */
router.get("/", function(req, res, next) {
  let user = req.session.user;
  if (user) {
    res.redirect("/home");
    return;
  }
  res.render("index");
});

/* GET home page. */
router.get("/home", function(req, res, next) {
  // res.send("welcome");
  let user = req.session.user;
  if (user) {
    res.render("home", { opp: req.session.opp, name: user.fullname });
    return;
  }
  res.redirect("/");
});

// Get to sign up page
router.get("/register", (req, res) => {
  res.render("includes/register-form");
  res.render("includes/login-form");
});

//Get to spectacle page
router.get("/Sdates", (req, res) => {
  res.render("includes/spectacles");
});

//Get to restaurant page
router.get("/Rdates", (req, res) => {
  res.render("includes/restaurant");
});

//Get to job dating page
router.get("/JDdates", (req, res) => {
  res.render("includes/job-dating");
});

// Post login data
router.post("/login", function(req, res, next) {
  user.login(req.body.username, req.body.password, function(result) {
    if (result) {
      req.session.user = result;
      req.session.opp = 1;
      res.send("Logged in as: " + result.username);
      res.redirect("/home");
    } else {
      res.send("Invalid password/ username !");
    }
  });
});

// Post register data
router.post("/register", function(req, res, next) {
  let userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password
  };
  console.log(userInput);

  user.create(userInput, function(lastId) {
    if (lastId) {
      // res.send("Welcome" + userInput.username);
      user.find(lastId, function(result) {
        req.session.user = result;
        req.session.opp = 0;
        res.redirect("/home");
      });
    } else {
      console.log("Error Creating a new user");
    }
  });
});

// Get loggout page

router.get("/loggout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy(function() {
      res.redirect("/");
    });
  }
});

module.exports = router;
