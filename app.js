var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var mongoose = require('mongoose');

// REQUIRING ROUTES
var blogRoutes = require("./routes/blogs");

// MONGOOSE SETUP
mongoose.connect("mongodb://127.0.0.1:27017/musingsdb", {useNewUrlParser: true, useUnifiedTopology: true});

// APP CONFIGURATION
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// App Routes
app.get("/", (req, res) => {
    res.render("index");
});

// USING IMPORTED ROUTES
app.use(blogRoutes);


app.listen(PORT, () => {
   console.log(`Musings app started on port ${PORT}`);
});