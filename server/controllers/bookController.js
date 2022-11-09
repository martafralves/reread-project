const Book = require('../models/books.model');
const asyncHandler = require ('express-async-handler');

//GET all books
const getBooks = asyncHandler (async (req, res) => {
    const books = await Book.find()
    res.status(200). json(books)
})

//GET one book by id
const getOneBook = asyncHandler( async(req, res) => {
    const book = await Book.findById(req.params.id)
    if(!book){
        res.status(400)
        throw new Error('Book not found')
    }
    res.status(200).json(book)
})

//create a book
const createBook = asyncHandler( async(req, res) => {
    if(!req.body.title || !req.body.author || !req.body.description || !req.body.price || !req.body.condition || !req.body.status){
        res.status(400)
        throw new Error('Please complete the required fields')
    }

    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        delivery: req.body.delivery,
        condition: req.body.condition,
        status: req.body.status,
        language: req.body.language
    })
    res.status(200).json(book)
})

//update a book
const updateBook = asyncHandler( async (req, res) => {
    const book = await Book.findById(req.params.id)
    if(!book){
        res.status(400)
        throw new Error('Book not found')
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedBook)
})

const deleteBook = asyncHandler (async(req, res) => {
    const book = await Book.findById(req.params.id)
    if(!book){
        res.status(400)
        throw new Error('Book not found')
    }
    
    await book.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteBook
}

