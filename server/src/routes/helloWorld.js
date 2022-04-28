const helloWorld = (_req, res) => res.status(200)
  .json({ message: 'Hello, Milenio!'});

module.exports = helloWorld;