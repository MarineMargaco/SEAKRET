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

// Post login data
router.post("/login", function(req, res, next) {
  user.login(req.body.username, req.body.password, function(result) {
    if (result) {
      req.session.user = result;
      req.session.opp = 1;
      res.redirect("/home");
      // res.send("Logged in as: " + result.username);
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
