import { useEffect } from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getBook, reset} from '../features/books/bookSlice'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

function BookProfile() {
  const {book, isLoading, isSuccess, isError, message} = useSelector((state) => state.books)
    
    const dispatch = useDispatch()
    const {id} = useParams()

    console.log(id)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getBook(id))
        console.log(getBook(id))
    }, [isError, message, id])

    if(isLoading) {
      return <Spinner/>
    }

  return (
    <div className="book-profile">
      <h4>Book Details</h4>
    </div>
  )
}

export default BookProfile
