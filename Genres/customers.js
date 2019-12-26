var express = require("express");
var router = express.Router();
const Joi = require("joi");

const { Customer, validate } = require("../validation/customerValidation");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort("name");
    //added status
    res.status(200).send(customers);
  } catch (err) {
    return err.message;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    //added status
    res.status(200).send(customer);
  } catch (err) {
    return err.message;
  }
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send("validation failed check Joi!!");

  const customerdb = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  try {
    const savedCustomer = await customerdb.save();
    res.status(200).send(savedCustomer);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // const genre = await customer.findById(req.params.id);

    // if (!genre) {
    //   res.status(400).send("The requested genre is not available");
    // }
    // const updatedGenre = genre.set({ type: req.body.type });
    // res.status(200).send(updatedGenre);

    //or we can use in one shot

    const secondway = await Customer.findByIdAndUpdate(
      req.params.id,
      { isGold: req.body.isGold, name: req.body.name, phone: req.body.phone },
      { new: true }
    );

    res.status(200).send(secondway);
  } catch (err) {
    console.log(err.message);
  }
});

//delete by id

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) {
    res.status(400).send("The requested customer is not available");
  }
  res.status(200).send(customer);
});

module.exports = router;
