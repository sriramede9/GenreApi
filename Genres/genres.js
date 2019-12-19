var express = require("express");
var router = express.Router();

//let's create some array as baby steps

const genres = [
  { id: 1, type: "action" },
  { id: 2, type: "historic" },
  { id: 3, type: "romance" }
];

//load all genres

router.get("/", (req, res) => {
  //added status
  res.status(200).send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  //send error

  if (!genre) {
    res.status(400).send("The requested genre is not available");
  }

  //console.log(genre);

  res.send(genre);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  //find by id;
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  //send error if no such genre
  if (!genre) {
    res.status(400).send("The requested genre is not available");
  }

  const validatedGenre = validate(btype);

  if (validatedGenre.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  //update type using id;

  genre.type = req.body.type;

  res.status(200).send(genre);
});

//delete by id

router.delete("/:id", (req, res) => {
  //get by id
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  //verify
  if (!genre) {
    res.status(400).send("The requested genre is not available");
  }

  //validate

  const validatedGenre = validate(btype);

  if (validatedGenre.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  //remove

  const genreId = genres.findIndex(genre);

  genres.splice(genreId, 1);

  res.send(genre);
});


function validate(btype) {
  const schema = {
    type: Joi.string()
      .min(3)
      .required()
  };
  const validatedGenre = Joi.validate(btype.type, schema);
  return validatedGenre;
}

module.exports = router;