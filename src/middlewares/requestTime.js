// middlewares/requestTime.js
module.exports = (req, res, next) => {
  res.setHeader('X-Request-Time', new Date().toISOString());
  next();
};
