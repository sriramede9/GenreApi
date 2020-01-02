var express = require("express");
var router = express.Router();
const Joi = require("joi");

const _ = require("lodash");
//encrypting and decrypting
const bcrypt = require("bcryptjs");

//integrating with data base

const { User } = require("../validation/userValidation");

router.post("/", async (req, res) => {
  //const btype = req.body;

  const validatedUser = validate(_.pick(req.body, ["email", "password"]));

  console.log(validatedUser);

  //make sure the received email do exist in database

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("Invalid email or password");
  }

  // const useredb = new User(_.pick(req.body, ["name", "email", "password"]));

  try {
    //const savedUser = await useredb.save();

    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validpassword) {
      res.status(400).send("Invalid email or password");
    }

    const userdetails = await User.findOne({
      name: req.params.name,
      password: req.params.password
    });

    // console.log(_.pick(userdetails, ["email", "password"]));
    res.status(200).send(true);
  } catch (err) {
    console.log(err.message);
  }
});

function validate(btype) {
  const schema = {
    email: Joi.string()
      .min(3)
      .required()
      .email(),

    password: Joi.string()
      .min(3)
      .required()
  };
  //console.log(bytpe);
  const validatedUser = Joi.validate(btype, schema);
  return validatedUser;
}
module.exports = router;
