import Book from "./books/Book"
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getAllBooks } from '../features/books/bookSlice';
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';

function SearchBar() {

    const dispatch = useDispatch()
    const {books, isLoading, isError, message} = useSelector((state) =>
    state.books)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getAllBooks())
    }, [isError, message, dispatch])

    if(isLoading){
        return <Spinner/>
    }

  return (
    <div className='search-container'>
        <input type= 'text' placeholder= 'Search for a book' className='search'/> 
        <div>
        
    </div>
        {books.map((book) => (
        <Book key={book._id} book={book}/>
        ))}
    </div>
  )
}

export default SearchBar
