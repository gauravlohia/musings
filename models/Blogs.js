var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String
});

module.exports = mongoose.model("Blog", blogSchema);