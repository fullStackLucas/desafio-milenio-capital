
const helloWorld = (_req, res) => {
  return res.status(200).json({ message: 'Hello, Milenio!'});
}

module.exports = helloWorld;