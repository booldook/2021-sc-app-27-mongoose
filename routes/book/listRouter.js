const path = require('path')
const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const { Books, Users } = require('../../schemas')

router.use('/create', async (req, res, next) => {
  try {
    const book = new Books({
      title: '홍길동전',
      writer: '길동이',
      content: '아버지를 아버지라...',
    })
    const rs = await book.save()
    res.json(rs);
  }
  catch(err) {
    next(createError(err))
  }
})

router.use('/update', async (req, res, next) => {
  try {
    const newBook = {
      id: '61765178797673427171f449',
      writer: '허생',
      title: '허생전',
      content: '허생이 하루는 쥐가 되어...'
    }
    // const { id, title, writer, content } = req.body
    const { id, title, writer, content } = newBook;

    const book = await Books.findByIdAndUpdate(
      id, 
      {
        title, 
        writer, 
        content 
      }, {
        new: true,
      })
    res.status(200).json(book);
  }
  catch(err) {
    next(createError(err))
  }
})

router.get('/delete/:id', async (req, res, next) => {
  try {
    const book = await Books.findByIdAndDelete(req.params.id)
    res.status(200).json(book)
  }
  catch(err) {
    next(createError(err))
  }
})


router.use('/list', async (req, res, next) => {
  try {
    const books = await Books.find()
    res.json(books);
  }
  catch(err) {
    next(createError(err))
  }
})

module.exports = router