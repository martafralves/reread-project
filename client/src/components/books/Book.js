import {Button} from 'react-bootstrap'
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom'
import bookImg from '../../images/book2.png';

function Book({book}) {
  const navigate = useNavigate()

  return (
    <MDBCol className='card-col' key={book.id}>
    <MDBCard className='card-custom h-100'>
      <MDBCardImage className='card-img' position='top' alt='book picture' src={bookImg} />
      <MDBCardBody>
        <MDBCardTitle>{book.title}</MDBCardTitle>
        <MDBCardText>
          {book.author}
        </MDBCardText>
        <MDBCardText><small>Price: {book.price['$numberDecimal'].toLocaleString()} €</small></MDBCardText>
        <Button className='btn-book' onClick={() => navigate(`/book/${book._id}`)} variant="primary">View</Button>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
  )
}

export default Book