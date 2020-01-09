//middleware to avoid try catch block
//function to remove try/catch
//express needs a direct

module.exports = function(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch {
      next(ex);
    }
  };
};
