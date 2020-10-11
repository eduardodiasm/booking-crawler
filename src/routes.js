const router = require('express').Router()

const crawlerController = require('./controllers/crawler')

router.get('/', crawlerController)

module.exports = router