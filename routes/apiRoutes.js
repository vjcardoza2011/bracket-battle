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

  // create user from sign up form
  app.post("/api/users", function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    db.User.create({
      username: user,
      password: pass
    }).then(function (dbResponse) {
      // console.log(dbResponse.id);
      // redirect to user's dashboard after signing up
      res.redirect("/dashboard/" + dbResponse.id);
    });
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
