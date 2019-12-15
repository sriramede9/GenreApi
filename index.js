var express = require("express");
var app = express();

//let's create some array as baby steps

const genres = [
  { id: 1, type: "action" },
  { id: 2, type: "historic" },
  { id: 1, type: "romance" }
];

//load all genres

app.get("/api/users", (req, res) => {
  res.send(genres);
});

app.listen(3300);
