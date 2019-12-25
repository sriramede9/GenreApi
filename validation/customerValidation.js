const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true },

  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 12
  }
});

const customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customerbody) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    phone: Joi.number()
      .min(12)
      .max(12)
      .required(),
    isGold: Joi.boolean().required()
  };
  return Joi.validate(customerbody, schema);
}

module.exports.customer = customer;
module.exports.validate = validateCustomer;
