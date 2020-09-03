var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello, World!!!");
});

app.listen(PORT, () => {
   console.log(`Musings app started on port ${PORT}`);
});