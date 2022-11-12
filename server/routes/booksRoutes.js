const express = require('express')

const { getBooks, getOneBook, getBookUser, getUsersBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController')
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.route('/').get(getBooks).post(protect, createBook)
router.route('/user').get(protect, getBookUser)
router.route('/find/:id').get(getUsersBooks)
router.route('/:id').get(getOneBook).delete(protect, deleteBook).put(protect, updateBook)

module.exports = router;