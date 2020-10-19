const router = require('express').Router()

const crawlerController = require('./controllers/crawler')

router.post('/', crawlerController)

module.exports = router