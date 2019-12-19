var express = require("express");
var app = express();

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

//middleware

app.use(logger);
//app.use(morgan("tiny")); //will log the requests
//one more middleware

//using static folder
app.use(express.static("temp"));

app.use((req, res, next) => {
  console.log("I am Authenticating");

  //if I want to restrict only use morgan in dev mode

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    appDebug("this is from app guy");
    dbDebug("this is from db guy");
  }

  next();
});

app.use("/api/genres", genres);

app.listen(3300, () => "started at 3300");
