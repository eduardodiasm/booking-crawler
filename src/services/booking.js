const cheerio = require('cheerio')
const querystring = require('querystring')
const fetchData = require('../utils/fetchData')
const parseStringToFloat = require('../utils/parseStringToFloat')

function isTheSameLocal (localOne, localTwo) {
  return localOne.includes(localTwo) || localTwo.includes(localOne)
}

class BookingService {

  async getScore (name, city) {
    
    /*
    *  Treating the query params.
    */

    const ss = `${name} ${city}`
    const query = querystring.encode({ ss })
    
    const url = `https://www.booking.com/searchresults.pt-br.html?${query}`
    const responseBody = await fetchData(url) 
    
    const $ = cheerio.load(responseBody)
    const localsElements = '.sr_item.sr_item_new.sr_item_default.sr_property_block.sr_card_no_hover.sr_item_no_dates'

    const localScores = {
      generalScore: 0,
      locationScore: 0
    }
    
    var foundLocal = false

    $(localsElements).each((index, element) => {

      const localName = $(element).find('span.sr-hotel__name').text().toLowerCase()
      const generalScoreEl = $(element).attr('data-score')
      const locationScoreEl = $(element).find('span.review-score-badge').text()

      if (isTheSameLocal(localName, name)) {
        foundLocal = true
        localScores.generalScore = parseStringToFloat(generalScoreEl)
        if (locationScoreEl) {
          localScores.locationScore = parseStringToFloat(locationScoreEl)
        }
      }

    })

    if (!foundLocal) return null

    const finalScore = (localScores.generalScore * 0.9) + (localScores.locationScore * 0.1)
    return finalScore

  }

}

module.exports = new BookingService()