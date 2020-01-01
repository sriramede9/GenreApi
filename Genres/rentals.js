var express = require("express");
var router = express.Router();
const Joi = require("joi");

const { Customer } = require("../validation/customerValidation");

//integrating with data base
const { Movies } = require("../validation/movieValidation");
const { Rentals, validate } = require("../validation/rentalValidation");

router.get("/", async (req, res) => {
  try {
    const rentals = await Rentals.find().sort("-dateOut");
    //added status
    res.status(200).send(rentals);
  } catch (err) {
    return err.message;
  }
});

router.post("/", async (req, res) => {
  //const btype = req.body;

  const validatedRental = validate(req.body);

  if (validatedRental.error) {
    res.send("check Joi Validation");
  }
  const customer = await Customer.findById(req.body.customerId);

  //5e058dd79cc593238c7f8ba0

  if (!customer) {
    res.send("no such customer exits with such id");
  }

  const movie = await Movies.findById(req.body.movieId);

  if (!movie) {
    res.send("no such customer exits with such id");
  }

  console.log(movie);
  //console.log(customer);

  if (movie.numberInStock === 0)
    return res.send("Movie not available in stock!!");

  let rental = new Rentals({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    const rentalMovie = await rental.save();

    //updating number of items in stock
    movie.numberInStock--;
    movie.save();

    res.status(200).send(rentalMovie);
  } catch (err) {
    console.log(err.message);
  }
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
