import {Col, Card, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import bookImg from '../../images/book2.png';

function Book({book}) {
  const navigate = useNavigate()

  return (
    <Col xs={12} md={6} lg={4} key={book.id}>
    <Card style={{ width: '18rem' }}>
      <Card.Header></Card.Header>
      <Card.Img variant="top" src={bookImg} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          {book.author}
        </Card.Text>
        <Card.Text><small>Price: {book.price['$numberDecimal'].toLocaleString()} €</small></Card.Text>
        <Button onClick={() => navigate(`/book/${book.id}`)} variant="primary">View</Button>
      </Card.Body>
    </Card>
  </Col>
  )
}

export default Book