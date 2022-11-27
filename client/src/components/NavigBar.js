import {Link, useNavigate} from 'react-router-dom'
import { Button, Navbar, Nav, Container,} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaRegUser } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import icon from '../images/icon.png';

function NavigBar(){

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth )

  function onLogout(){
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

    return(
        <Navbar bg="light" expand="md" fixed="sticky">
      <Container>
        <Navbar.Brand>
          <img
              src={icon}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Vitalia logo"
            />{' '}
            <h3 className='brand-name d-inline-block align top'>ReRead</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
            {user ? (<>
            <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
            <Nav.Link as={Link} to="/addbook">Sell Book</Nav.Link>
            <Button className='btn' onClick={onLogout}><FaSignOutAlt /> Logout</Button></>) : 
            (<>
              <Nav.Link as={Link} to="/signup" ><FaRegUser /> Register</Nav.Link>
              <Nav.Link as={Link} to="/login" ><FaSignInAlt /> Login</Nav.Link>
            </>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default NavigBar;