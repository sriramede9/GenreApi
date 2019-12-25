var express = require("express");
var router = express.Router();
const Joi = require("joi");
//integrating with data base

const { Genre, validate } = require("../validation/genreValidation");

//let's create some array as baby steps

// const genres = [
//   { id: 1, type: "action" },
//   { id: 2, type: "historic" },
//   { id: 3, type: "romance" }
// ];

//load all genres

router.get("/", async (req, res) => {
  try {
    // const courses = await Course.find();

    const genres = await Genre.find().sort("type");
    //added status
    res.status(200).send(genres);
  } catch (err) {
    return err.message;
  }
});

router.get("/:id", async (req, res) => {
  //const genre = genres.find(c => c.id === parseInt(req.params.id));

  //send error

  // if (!genre) {
  //   res.status(400).send("The requested genre is not available");
  // }

  //console.log(genre);
  try {
    // const courses = await Course.find();

    const genre = await Genre.findById(req.params.id);
    //added status
    res.status(200).send(genre);
  } catch (err) {
    return err.message;
  }

  //res.send(genre);
});

router.post("/", async (req, res) => {
  const btype = req.body;

  const validatedGenre = validate(btype);

  if (validatedGenre.error) {
    return res.status(400).send("validation failed check joi");
  }

  //const idgenerated = genres.length + 1;

  //genres.push({ name: validatedGenre });

  //validating and pushing to db!!

  const genredb = new Genre({
    type: req.body.type
  });

  try {
    const savedGenre = await genredb.save();
    res.status(200).send(savedGenre);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  //find by id;
  // const genre = genres.find(c => c.id === parseInt(req.params.id));

  //send error if no such genre
  // if (!genre) {
  //   res.status(400).send("The requested genre is not available");
  // }

  //const validatedGenre = validate(btype);

  // if (validatedGenre.error) {
  //   return res.status(400).send(result.error.details[0].message);
  // }

  //update type using id;

  //genre.type = req.body.type;

  //finding by db and updating

  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      res.status(400).send("The requested genre is not available");
    }
    const updatedGenre = genre.set({ type: req.body.type });
    res.status(200).send(updatedGenre);

    //or we can use in one shot

    //  const secondway=await Genre.findByIdAndUpdate(req.params.id,{type:req.body.type},{new:true});
  } catch (err) {
    console.log(err.message);
  }

  //res.status(200).send(genre);
});

//delete by id

router.delete("/:id", async (req, res) => {
  //get by id
  // const genre = genres.find(c => c.id === parseInt(req.params.id));

  // //verify
  // if (!genre) {
  //   res.status(400).send("The requested genre is not available");
  // }

  //validate

  // const validatedGenre = validate(btype);

  // if (validatedGenre.error) {
  //   return res.status(400).send(result.error.details[0].message);
  // }

  //remove

  // const genreId = genres.findIndex(genre);

  // genres.splice(genreId, 1);

  // //find and delete by id

  // Genre.findByIdAndRemove(parseInt(req.params.id));

  //res.send(genre);

  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    res.status(400).send("The requested genre is not available");
  }
  res.status(200).send(genre);
});

module.exports = router;
