module.exports = (err, _req, res, _next) => {
  console.error({ message: err.message });
  console.log(err);

  return res.status(500).json({ message: err.message });
};