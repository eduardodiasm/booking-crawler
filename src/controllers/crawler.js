const axios = require('axios')
const cheerio = require('cheerio')
const querystring = require('querystring')

async function fecthData (url) {

  const { data } = await axios.get(url)
  return data

}

module.exports = async (req, res) => {

  const { name, city } = req.body

  // search params
  const ss = `${name} ${city}`
  const query = querystring.encode({ ss })

  const url = `https://www.booking.com/searchresults.pt-br.html?${query}`
  const html = await fecthData(url) 

  const $ = cheerio.load(html)
  console.log($('.sr-hotel__name').text())

  return res.json(html)

}
