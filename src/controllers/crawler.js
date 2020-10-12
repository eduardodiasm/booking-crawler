const axios = require('axios')
const cheerio = require('cheerio')
const querystring = require('querystring')

async function fecthData (url) {

  const { data } = await axios.get(url)
  return data

}

function parseStringToFloat (string) {
  const dottedString = string.replace(',', '.')
  const decimal = parseFloat(dottedString)
  return decimal
}

module.exports = async (req, res) => {

  const { name, city } = req.body

  if (!name || !city) return res.status(400).send('missing arguments')
  
  // query params
  const ss = `${name} ${city}`
  const query = querystring.encode({ ss })
  
  const url = `https://www.booking.com/searchresults.pt-br.html?${query}`
  const responseBody = await fecthData(url) 
  
  const $ = cheerio.load(responseBody)

  var hotelsCardsClass = '.sr_item.sr_item_new.sr_item_default.sr_property_block.sr_card_no_hover.sr_item_no_dates'

  $(hotelsCardsClass).each((index, element) => {

    const localName = $(element).find('span.sr-hotel__name').text()
    const localScore = $(element).attr('data-score')

    // standardizing the local names
    let lowerLocalName = localName.toLowerCase()
    let lowerReqName = name.toLowerCase()

    if (lowerLocalName.includes(lowerReqName)) {
      foundScore = true
      score = parseStringToFloat(localScore)
    }

  })

  if (foundScore) {
    return res.status(200).json({
      score: score
    })
  }

  return res.status(200).json({
    score: 0
  })

}
