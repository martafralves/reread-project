import { useEffect } from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getaBook} from '../features/books/bookSlice'
import { useParams } from 'react-router-dom'
import BookProfileItem from '../components/books/BookProfileItem'
import Spinner from '../components/Spinner'
import '../styles/book.css'

function BookProfile() {
  const {book, isLoading, isSuccess, isError, message} = useSelector((state) => state.books)
    
    const dispatch = useDispatch()
    const {id} = useParams()


    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getaBook(id))
    }, [isError, message, id, isSuccess, dispatch])

    if(isLoading) {
      return <Spinner/>
    }

  return (
    <div className="book-profile">
      <h3 className='page-title'>Book Details</h3>
      <BookProfileItem book={book}/>
    </div>
  )
}

export default BookProfile
