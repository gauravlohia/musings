var express = require('express'),
    Blog = require('../models/Blogs'),
    router = express.Router();


// INDEX ROUTE 
router.get("/blogs", (req, res) => {
    Blog.find({}, (err, foundBlogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/index", {blogs: foundBlogs});
        }
    });
});

// NEW ROUTE - show the form to create a new blog
router.get("/blogs/new", (req, res) => {
    res.render("blogs/new");
});

// CREATE route - create a new blog
router.post("/blogs", (req, res) => {
    var newBlog = req.body.blog;
    newBlog.date = new Date();
    Blog.create(req.body.blog, (err, blog) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE - show the selected blog
router.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE - show the edit page for a particular blog
router.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            console.log(err);
        } else {
            res.render("blogs/edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE - make changes to a particular blog and redirect somewhere
router.put("/blogs/:id", (req, res) => {
    var updatedBlog = req.body.blog;
    updatedBlog.date = new Date();
    Blog.findByIdAndUpdate(req.params.id, updatedBlog, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

module.exports = router;