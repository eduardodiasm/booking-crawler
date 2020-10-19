const BookingService = require('../services/booking')

module.exports = async (req, res) => {

  const name = req.body.name.toLowerCase()
  const city = req.body.city

  const bookingScore = await BookingService.getScore(name, city)

  if (!bookingScore) {
    return res.status(404).json({ message: 'local not found' })
  }
 
  return res.json({
    score: bookingScore
  })

}
