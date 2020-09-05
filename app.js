var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var mongoose = require('mongoose');
var path = require('path');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var User = require('./models/User');


// MONGOOSE SETUP
mongoose.connect("mongodb://127.0.0.1:27017/musingsdb", {useNewUrlParser: true, useUnifiedTopology: true});

// APP CONFIGURATION
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(flash());


// PassportJs Configuration
app.use(session({
    secret: "alohamora",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Middleware to pass data to all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();
});


// REQUIRING ROUTES
var blogRoutes = require("./routes/blogs");
var userRoutes = require("./routes/user");

// APP ROUTES
app.get("/", (req, res) => {
    res.render("index");
});


// USING IMPORTED ROUTES
app.use(blogRoutes);
app.use(userRoutes);


app.listen(PORT, () => {
   console.log(`Musings app started on port ${PORT}`);
});