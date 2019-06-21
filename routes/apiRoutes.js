var db = require("../models");

module.exports = function(app) {
  // view all users and their brackets
  app.get("/api/users", function (req, res) {
    db.User.findAll({
      include: [db.Bracket]
    }).then(function (dbResponse) {
      res.json(dbResponse);
    });
  });

  // auto login for dev purposes
  app.get("/auto-login", function (req, res) {
    req.session.loggedin = true;
    req.session.userId = 1;
    res.send();
  });

  // create user from sign up form
  app.post("/api/users", function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    db.User.create({
      username: user,
      password: pass
    }).then(function (dbResponse) {
      // console.log(dbResponse.id);
      // user is now logged in, so save their data and loggedin state
      req.session.loggedin = true;
      req.session.userId = 1234567;
      // redirect to user's dashboard
      res.redirect("/dashboard/" + dbResponse.id);
    });
  });

  // check user's login attempt from login form
  app.post("/login", function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    db.User.findAll({
      where: {
        username: user,
        password: pass
      }
    }).then(function (dbResponse) {
      console.log(dbResponse);
      console.log(dbResponse[0].id);
      if (dbResponse.length === 0) {
        console.log("no user with those credentials");
        res.json(false);
      } else {
        console.log("user found");
        // set the session loggedin state and userId
        req.session.loggedin = true;
        req.session.userId = dbResponse[0].id;
        console.log(req.session.loggedin);
        console.log(req.session.userId);
        res.redirect("/dashboard/" + dbResponse[0].id);
        // res.json(true);
      }
    });
  });

  // logout
  app.post("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
  });

  // create new bracket
  app.post("/api/brackets/:id", function(req, res) {
    var userId = req.params.id;
    var bracketName = req.body.name;
    var teamNames = req.body.teamNames;

    db.Bracket.create({
      bracket_name: bracketName,
      teamNames: teamNames,
      UserId: userId
    }).then(function(dbResponse) {
      // display that bracket page
      res.render("bracket");
    });
  });

  // // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
