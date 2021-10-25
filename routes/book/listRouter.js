const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

router.use('/create', (req, res, next) => {
  res.send('Book');
})

module.exports = router