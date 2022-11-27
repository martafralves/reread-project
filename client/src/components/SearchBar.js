import Book from "./books/Book"
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getAllBooks} from '../features/books/bookSlice';
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';
import {FaSearch} from 'react-icons/fa'
import axios from "axios";



function SearchBar() {

    const dispatch = useDispatch();

    const {books, isLoading, isError, isSuccess, message} = useSelector((state) =>
    state.books)

    const [query, setQuery] = useState('')
    const [filteredBooks, setFilteredBooks] = useState([])
    
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess){
            setFilteredBooks(books)
        }

        dispatch(getAllBooks())
    }, [isError, isSuccess, message, dispatch, setFilteredBooks])

    function onChange(e){
        e.preventDefault()
        setQuery(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        var res
        try{
            res = await axios.get('/api/books/search', {params: {q: query}})
            setFilteredBooks(res.data)
            console.log(filteredBooks)
            setQuery('')
        }catch(error){
            console.warn(error)
            toast.error(message)
        }
    }


    if(isLoading){
        return <Spinner/>
    }

    return (
    <div className='search-container'>
        <form onSubmit={handleSubmit}>
        <input type= 'text' placeholder= 'Search for a book' className='search' value={query}  onChange={onChange}/>
        <button type='submit'><FaSearch/></button> 
        </form>
        <div className='book-container'>
        {Array.isArray(filteredBooks) ? (filteredBooks.map((book) => (
        <Book key={book._id} book={book}/>
        ))) : [] && 
        <div>
            <h3>Sorry, couldn't find any books for your search.</h3>
            <p>Please try a different book or come back later!</p>
        </div>}
        </div>
    </div>
  )
}

export default SearchBar
