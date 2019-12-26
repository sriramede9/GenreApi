const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genreValidation");

//i want genreSchema as well

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number
});

const Movies = mongoose.model("Movie", movieSchema);

function validate(btype) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const validatedGenre = Joi.validate(btype.type, schema);
  return validatedGenre;
}

module.exports.Movies = Movies;
module.exports.validate = validate;
