const router = require('express').Router()

const scoreController = require('./controllers/score')

router.post('/', scoreController)

module.exports = router
