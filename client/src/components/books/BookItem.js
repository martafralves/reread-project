import {RiDeleteBinLine, RiEdit2Line} from 'react-icons/ri'
import {useDispatch} from 'react-redux'
import {deleteBook} from '../../features/books/bookSlice'
import {useNavigate} from 'react-router-dom'

function BookItem({book}){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return(
        <div className='book'>
            <div>
                <h3>{book.title}</h3>
                <strong>{book.author}</strong>
            </div>
            <div>
                <p>{book.price['$numberDecimal'].toLocaleString()} €</p>
                <button onClick={() => dispatch(deleteBook(book._id))} className='books-btn'><RiDeleteBinLine/></button>
                <button onClick={() => navigate(`/editbook/${book._id}`)} className='books-btn'><RiEdit2Line/></button>
            </div>
        </div>
    )
}
export default BookItem