import {Col, Card, Button} from 'react-bootstrap'

function Book({book}) {
   
  return (
    <Col xs={12} md={6} lg={4} key={book.id}>
    <Card style={{ width: '18rem' }}>
      <Card.Header></Card.Header>
      <Card.Img variant="top" src='' />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          {book.author}
        </Card.Text>
        <Card.Text><small>Price: {book.price['$numberDecimal'].toLocaleString()} €</small></Card.Text>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
  </Col>
  )
}

export default Book