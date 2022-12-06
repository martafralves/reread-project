import axios from 'axios'

const API_URL = '/api/books/'
const API_URL_PRO = '/api/books/user/'
const API_URL_SEARCH = '/api/books/search?q='
const API_URL_BOOK = '/api/books/search/'


//create new book
const createBook = async(bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, bookData, config)
    return response.data
}

//get all books
const getAllBooks = async() => {
    const response = await axios.get(API_URL)
    return response.data
}

//get books from logged in user
const getBooks = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL_PRO, config)
    return response.data
}

//delete book
const deleteBook = async(bookId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + bookId, config)
    return response.data
}

//udpate book
const updateBook = async(bookId, token, updatedBook) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + bookId, config, updatedBook)
    return response.data
}

//get one book
const getBook = async(bookId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + bookId, config)
    return response.data
}

//get one book without auth
const getaBook = async(bookId) => {
    const response = await axios.get(API_URL_BOOK + bookId)
    return response.data
}

//Search book
const searchBooks = async(query) => {

    const response = await axios.get(API_URL_SEARCH + query)
    return response.data
}
const bookService = {
    createBook,
    getBooks,
    deleteBook,
    updateBook,
    getBook,
    getaBook,
    getAllBooks,
    searchBooks
}

export default bookService