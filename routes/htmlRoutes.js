var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // show homepage
    res.render("index");
    

    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // show login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // check user's login attempt from login form
  app.post("/login", function(req, res) {
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
        res.redirect("/dashboard/" + dbResponse[0].id);
        // res.json(true);
      }
    });
  });

  
  // show sign up page
  app.get("/sign-up", function(req, res) {
    res.render("signup");
  });


  // after user logs in, show their dashboard
  app.get("/dashboard/:id", function(req, res) {
    var userId = req.params.id;
    db.Bracket.findAll({
      where: {
        UserId: userId
      }
    }).then(function(dbResponse) {
      res.render("dashboard");
    });
  });


  // display a bracket page
  app.get("/bracket/:id", function(req, res) {
    res.render("bracket");
  });


  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
