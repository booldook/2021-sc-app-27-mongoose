const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const userRouter = require('./userRouter')

router.use('/', userRouter);

module.exports = router