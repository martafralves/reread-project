import {Link, useNavigate} from 'react-router-dom'
import { Button, Navbar, Nav, Container,} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaRegUser } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

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
            <h3 className='brand-name d-inline-block align top'>ReRead</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user ? (<Button className='btn' onClick={onLogout}><FaSignOutAlt /> Logout</Button>) : 
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