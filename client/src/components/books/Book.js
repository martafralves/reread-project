import { useEffect } from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getBook, reset} from '../../features/books/bookSlice'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner'

function Book() {
    const {book, isLoading, isSuccess, isError, message} = useSelector((state) => state.books)
    
    const dispatch = useDispatch()
    const {bookId} = useParams()

    console.log(bookId)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getBook(bookId))
        console.log(getBook(bookId))
    }, [isError, message, bookId])
  return (
    <div>Book</div>
  )
}

export default Book