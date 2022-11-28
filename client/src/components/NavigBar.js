import {Link, useNavigate} from 'react-router-dom'
import { Button, Navbar, Nav, Container,} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaRegUser, FaListUl } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import icon from '../images/icon.png';
import '../styles/navbar.css'

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
              alt="Reread logo"
            />{' '}
            <h3 className='brand-name d-inline-block align top'>ReRead</h3></Navbar.Brand>
        <Navbar.Toggle className = 'custom-toggler'aria-controls="basic-navbar-nav"><FaListUl/></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className='navbar-custom-link'>Home</Nav.Link>
            <Nav.Link as={Link} to="/search" className='navbar-custom-link'>Search</Nav.Link>
            {user ? (<>
            <Nav.Link as={Link} to="/profile" className='navbar-custom-link'>My Profile</Nav.Link>
            <Nav.Link as={Link} to="/addbook" className='navbar-custom-link'>Sell Book</Nav.Link>
            <Button className='btn' onClick={onLogout}><FaSignOutAlt /> Logout</Button></>) : 
            (<>
              <Nav.Link as={Link} to="/signup" className='navbar-custom-link' ><FaRegUser /> Register</Nav.Link>
              <Nav.Link as={Link} to="/login" className='navbar-custom-link' ><FaSignInAlt /> Login</Nav.Link>
            </>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default NavigBar;