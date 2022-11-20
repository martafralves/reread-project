

function BookProfileItem({book}) {
  return (
    <div>
      <div>
        <h3>{book.title}</h3>
        <strong>{book.author}</strong>
       </div>
       <div>
        <h6>Price: {book.price['$numberDecimal'].toLocaleString()} €</h6>
        <p>Language: {book.language}</p>
        <p>Delivery: {book.delivery}</p>
        <p>Status: {book.status}</p>
        <p>Condition: {book.condition}</p>
        <p>Description: {book.description}</p>
       </div>
    </div>
  )
}

export default BookProfileItem
