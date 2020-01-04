const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean
  }
});

const User = mongoose.model("User", userSchema);

function validateUser(btype) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),

    email: Joi.string()
      .min(3)
      .required()
      .email(),

    password: Joi.string()
      .min(5)
      .required()
  };
  //console.log(bytpe);
  const validatedGenre = Joi.validate(btype, schema);
  return validatedGenre;
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.userSchema = userSchema;
