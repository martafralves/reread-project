import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

function BookProfileItem({book}) {

  const navigate = useNavigate();
  
  return (
    <div className="details-container">
      <div className="title-container">
        <strong>Title: {book.title} <br/></strong>
        <strong>Author: {book.author}</strong>
       </div>
       <div className="info-container">
        <h6>Price: {book.price['$numberDecimal'].toLocaleString()} €</h6>
        {book.language ? (<p>Language: {book.language}</p>) : ''}
        {book.delivery ?  (<p>Delivery: {book.delivery}</p>) : ''}
        <p>Status: {book.status}</p>
        <p>Condition: {book.condition}</p>
        <p>Description: {book.description}</p>
        <Button onClick={() => navigate('/messenger', {state: {book: book.user}})} className="contact-btn">Contact Seller</Button>
       </div>
    </div>
  )
}

export default BookProfileItem
