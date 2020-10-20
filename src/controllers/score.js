const ScoreService = require('../services/score')

module.exports = async (req, res) => {
  const name = req.body.name.toLowerCase()
  const city = req.body.city

  const score = await ScoreService.getScore({ name, city })

  if (!score) {
    return res.status(404).json({ message: 'local not found', score })
  }

  return res.json({ score })
}
