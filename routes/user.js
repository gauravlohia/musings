var express = require('express'),
    User = require('../models/User'),
    passport = require('passport'),
    router = express.Router();


// Signup route - shows signup form
router.get('/signUp', (req, res) => {
    res.render("user/user_new");
});

// Signup logic
router.post('/signUp', (req, res) => {
    var newUser = { username: req.body.username };
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
            res.redirect("/signUp");
        } else {
            req.flash("success", `${user.username} registered successfully`);
            res.redirect("/login");
        }
    });
});

// Login route - shows login form
router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

// Login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}),
    (req, res) => { }
);

//Logout logic
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;