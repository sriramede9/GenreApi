var express = require("express");
var app = express();

app.use(express.json());

//let's create some array as baby steps

const genres = [
  { id: 1, type: "action" },
  { id: 2, type: "historic" },
  { id: 3, type: "romance" }
];

//load all genres

app.get("/api/users", (req, res) => {
  res.send(genres);
});

app.get("/api/users/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  console.log(genre);

  res.send(genre);
});

app.post("/api/users", (req, res) => {
  const btype = req.body;

  const idgenerated = genres.length + 1;

  genres.push({ id: idgenerated, type: btype.type });

  //console.log();
  res.send({ id: idgenerated, type: btype.type });
});

app.listen(3300, () => "started at 3300");
