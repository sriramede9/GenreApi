var express = require("express");
var app = express();

app.use(express.json());

const Joi = require("joi");

//let's create some array as baby steps

const genres = [
  { id: 1, type: "action" },
  { id: 2, type: "historic" },
  { id: 3, type: "romance" }
];

//load all genres

app.get("/api/genres", (req, res) => {
  //added status
  res.status(200).send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  //send error

  if (!genre) {
    res.status(400).send("The requested genre is not available");
  }

  //console.log(genre);

  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const btype = req.body;

  const validatedGenre = validate(btype);

  if (validatedGenre.error) {
    return res
      .status(400)
      .send("type should be more than 3 chars and should consist in req body");
  }

  const idgenerated = genres.length + 1;

  genres.push({ id: idgenerated, validatedGenre });

  //console.log();
  res.status(200).send({ id: idgenerated, type: validatedGenre });
});

app.put("/api/genres/:id", (req, res) => {
  //find by id;
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  //send error if no such genre
  if (!genre) {
    res.status(400).send("The requested genre is not available");
  }

  //update type using id;

  genre.type = req.body.type;

  res.status(200).send(genre);
});

//delete by id

app.delete("/api/users/:id", (req, res) => {
  //get by id
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  //validate
  if (!genre) {
    res.status(400).send("The requested genre is not available");
  }
  //remove

  const genreId = genres.findIndex(genre);

  genres.splice(genreId, 1);

  res.send(genre);
});

app.listen(3300, () => "started at 3300");
function validate(btype) {
  const schema = {
    type: Joi.string()
      .min(3)
      .required()
  };
  const validatedGenre = Joi.validate(btype.type, schema);
  return validatedGenre;
}
