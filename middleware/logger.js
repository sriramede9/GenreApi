function log(req, res, next) {
  console.log("I am logging ....");
  next();
}

module.exports = log;
