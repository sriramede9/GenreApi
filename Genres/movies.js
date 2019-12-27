var express = require("express");
var router = express.Router();
const Joi = require("joi");

const { Genre } = require("../validation/genreValidation");
//integrating with data base

const { Movies, validate } = require("../validation/movieValidation");

router.get("/", async (req, res) => {
  try {
    // const courses = await Course.find();

    const movies = await Movies.find().sort("title");
    //added status
    res.status(200).send(movies);
  } catch (err) {
    return err.message;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    //added status
    res.status(200).send(movie);
  } catch (err) {
    return err.message;
  }
});

router.post("/", async (req, res) => {
  const validatedMovie = validate(req.body);

  if (validatedMovie.error) {
    return res.status(400).send("validation failed check joi");
  }
  //getting genre by genre id

  const genre = await Genre.findById(req.body.genre);

  if (!genre) res.status(400).send("No Genre found with such id");

  //validating and pushing to db!!

  const moviedb = new Movies({
    title: req.body.title,
    genre: {
      _id: genre._id,
      type: genre.type
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  try {
    const savedMovie = await moviedb.save();
    res.status(200).send(savedMovie);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);

    if (!movie) {
      res.status(400).send("The requested genre is not available");
    }

    //joi validation
    const validatedMovie = validate(req.params.body);

    if (validatedMovie.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const updatedMovie = movie.set({ type: req.body.type });
    res.status(200).send(updatedMovie);

    //or we can use in one shot

    //  const secondway=await Genre.findByIdAndUpdate(req.params.id,{type:req.body.type},{new:true});
  } catch (err) {
    console.log(err.message);
  }
});

//delete by id

router.delete("/:id", async (req, res) => {
  const movie = await Movies.findByIdAndRemove(req.params.id);

  if (!movie) {
    res.status(400).send("The requested genre is not available");
  }
  res.status(200).send(movie);
});

module.exports = router;
