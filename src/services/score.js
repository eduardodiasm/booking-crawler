const BookingService = require('./web/booking')

class ScoreService {
  async getScore (params) {
    const webScores = await Promise.all(this.callWebServices(params))
    const score = webScores.reduce((a, b) => a + b, 0)

    return score
  }

  callWebServices (params) {
    const promises = []
    promises.push(BookingService.getScore(params.name, params.city))
    return promises
  }
}

module.exports = new ScoreService()
