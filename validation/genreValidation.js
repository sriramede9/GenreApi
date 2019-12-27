const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(btype) {
  const schema = {
    type: Joi.string()
      .min(3)
      .required()
  };
  //console.log(bytpe);
  const validatedGenre = Joi.validate(btype, schema);
  return validatedGenre;
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;
