var express = require('express'),
    Blog = require('../models/Blogs'),
    router = express.Router();

// NEW ROUTE - show the form to create a new blog
router.get("/blogs/new", (req, res) => {
    res.render("blogs/new");
});

// CREATE route - create a new blog
router.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, blog) => {
        if(err) {
            console.log(err);
        } else {
            console.log(blog);
            res.redirect("/");
        }
    });
});

module.exports = router;