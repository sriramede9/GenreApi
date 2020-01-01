const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
      isGold: { type: Boolean, required: true, default: false },

      phone: {
        type: String,
        minlength: 10,
        maxlength: 12
      }
    }),
    required: true
  },

  movie: {
    type: mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
      dailyRentalRate: { type: Number, required: true, min: 0, max: 255 }
    }),
    required: true
  },

  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date,
    default: Date.now
  },
  rentalFee: { type: Number, min: 0 }
});

const Rentals = mongoose.model("Rental", rentalSchema);

function validateRentals(btype) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };
  //console.log(bytpe);
  const validatedRental = Joi.validate(btype, schema);
  return validatedRental;
}

module.exports.Rentals = Rentals;
module.exports.validate = validateRentals;
module.exports.genreSchema = rentalSchema;
