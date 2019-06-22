var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // show login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // show sign up page
  app.get("/sign-up", function(req, res) {
    res.render("signup");
  });

  // after user logs in, show their dashboard
  app.get("/dashboard/", function(req, res) {
    console.log(req.session.loggedin);
    console.log(req.session.userId);

    // find user's brackets
    db.Bracket.findAll({
      where: {
        UserId: req.session.userId
      }
    }).then(function (dbResponse) {
      res.render("dashboard", {
        // pass in loggedin state, userid, and brackets
        loggedin: req.session.loggedin,
        userId: req.session.userId,
        brackets: JSON.stringify(dbResponse)
      });
    });
  });

  // display a bracket page
  app.get("/bracket/:id", function(req, res) {
    res.render("bracket");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
