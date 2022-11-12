import {Link} from 'react-router-dom'
import { Navbar, Nav, Container,} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaRegUser } from 'react-icons/fa'

function NavigBar(){
    return(
        <Navbar bg="light" expand="md" fixed="sticky">
      <Container>
        <Navbar.Brand>
            <h3 className='brand-name d-inline-block align top'>ReRead</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" >About</Nav.Link>
            <Nav.Link as={Link} to="/signup" ><FaRegUser /> Register</Nav.Link>
            <Nav.Link as={Link} to="/login" ><FaSignInAlt /> Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default NavigBar;