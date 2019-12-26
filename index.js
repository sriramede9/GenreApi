var express = require("express");
var app = express();
const mongoose = require("mongoose");

app.use(express.json());

const Joi = require("joi");

const logger = require("./middleware/logger");

//morgan to log every http method that is requested on this port
var morgan = require("morgan");

//customized logger
//set DEBUG=*Logging

const appDebug = require("debug")("app:generalLogging");
const dbDebug = require("debug")("app:dbLogging");

//getting genre route

const genres = require("./Genres/genres");
const customers = require("./Genres/customers");
const movies = require("./Genres/movies");

//middleware

app.use(logger);
//app.use(morgan("tiny")); //will log the requests
//one more middleware

//using static folder
app.use(express.static("temp"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  appDebug("this is from app guy");
  dbDebug("this is from db guy");
}

mongoose
  .connect("mongodb://localhost/Genres")
  .then(() => console.log("db is connected!!"))
  .catch(err => console.log("error couldn't connect to mongodb.." + err));

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

app.listen(3300, () => "started at 3300");
