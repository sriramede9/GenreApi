var express = require("express");
var router = express.Router();

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

  const useredb = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await useredb.save();
    res.status(200).send(savedUser);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
