var express = require("express");
var router = express.Router();

const _ = require("lodash");

const bcrypt = require("bcryptjs");

//integrating with data base

const { User, validate } = require("../validation/userValidation");

router.post("/", async (req, res) => {
  //const btype = req.body;

  const validatedUser = validate(req.body);

  console.log(validatedUser);

  //make sure the received email do exist in database

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("email id is already registered");
  }

  const useredb = new User(_.pick(req.body, ["name", "email", "password"]));

  try {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(useredb.password, salt);

    useredb.password = hash;
    const savedUser = await useredb.save();

    res.status(200).send(_.pick(savedUser, ["id", "name", "email"]));
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
