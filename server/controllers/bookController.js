const Book = require('../models/books.model');
const User = require('../models/users.model');
const asyncHandler = require ('express-async-handler');
const { default: mongoose } = require('mongoose');


//GET all books
const getBooks = asyncHandler (async (req, res) => {
    const books = await Book.find()
    res.status(200). json(books)
})

//GET  books from logged in  user
const getBookUser = asyncHandler (async (req, res) => {
    const books = await Book.find({user: req.user._id})
    res.status(200). json(books)
})

//GET books for a specific user

const getUsersBooks = asyncHandler (async (req, res) => {
    const findUser = await User.findById(req.params.id)
    
    if(!findUser){
        res.status(400)
        throw new Error('User not found')
    }
    const userBooks = await Book.find({user: findUser})
    
    if(!userBooks){
        res.status(400)
        throw new Error ('This user has no books')
    }

    res.status(200).json(userBooks)

})

//GET one book by id
const getOneBook = asyncHandler( async(req, res) => {
    const { id, title, author, price, language, condition, status, delivery, description } = await Book.findById(req.params.id)

    res.status(200).json({
        _id: id,
        title,
        author,
        price,
        language,
        condition,
        status,
        delivery, 
        description
    })
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
        language: req.body.language,
        user: req.user._id
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

    if(!req.user) { //check for user
        res.status(401)
        throw new Error('User not found')
    }

    //make sure logged in user matches the owner of the book
    if(book.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error ('User not authorized')
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

    if(!req.user) { //check for user
        res.status(401)
        throw new Error('User not found')
    }
    
    //make sure logged in user matches the owner of the book
    if(book.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error ('User not authorized')
    } 
    
    await book.remove()
    res.status(200).json({id: req.params.id})
})

    //get books by search
    const getBooksBySearch = asyncHandler(async(req, res) => {
        const {searchQuery} = req.query;

        try{
            const title = new RegExp(searchQuery, 'i')
            const books = await Book.find({title})
            res.status(200).json(books)
        }catch(error){
            res.status(404)
            throw new Error ('Could not find the book you are looking for')
        }
    })

module.exports = {
    getBooks,
    getBookUser,
    getUsersBooks,
    getBooksBySearch,
    getOneBook,
    createBook,
    updateBook,
    deleteBook
}

