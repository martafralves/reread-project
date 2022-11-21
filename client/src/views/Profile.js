import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import { getBooks } from '../features/books/bookSlice';
import Spinner from '../components/Spinner'
import BookItem from '../components/books/BookItem';
import '../styles/profile.css'
import { Button } from 'react-bootstrap';

function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {books, isLoading, isError, message} = useSelector((state) =>
    state.books)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
        if(isError) {
            toast.error(message)
        }
        dispatch(getBooks())
    }, [user, navigate, isError, message, dispatch])

    if(isLoading){
        return <Spinner/>
    }
  return (
    <div className = 'profile-container'>
        <div className="jumbotron jumbotron-fluid">
            <div className="container mt-2">
                <h1 className="display-4 profile-user"><strong>{user.username}</strong> Profile</h1>
                <Button onClick={() => navigate(`/editprofile/${user.id}`)}>Update Profile</Button>
             <div className='row btn-row m-4'>
                <div className='col-4'>
                    <Button onClick={() => navigate('/addbook')}>Sell Book</Button>
                </div>
                <div className='col-4'>
                    <Button>Message Box</Button>
                </div>
                <div className='col-4'>
                    <Button>Buy book</Button>
                </div>
                </div>       
            </div>
        </div>
        <div className='container book-container pt-4'>
            {books.length > 0 ? (
                <div className ='books'>
                    <h4>Books you are selling</h4>
                    {books.map((book) => (<BookItem key={book._id} book={book}/>))}
                </div>
            ) : (<h5>You have no books for sale</h5>) } 
        </div>
    </div>
  )
}

export default Profile
