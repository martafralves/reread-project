const express = require('express')

const { getBooks, getOneBook, createBook, updateBook, deleteBook } = require('../controllers/bookController')

const router = express.Router()

router.route('/').get(getBooks).post(createBook)
router.route('/:id').get(getOneBook).delete(deleteBook).put(updateBook)

module.exports = router;