import { MDBFooter } from 'mdb-react-ui-kit';
import '../styles/navbar.css'

function Footer() {
  return (
    <MDBFooter bgColor='light' className='footer-custom text-center text-lg-left'>
    <div className='text-center p-3'>
      <p className='footer-text'>Icons by: icons8.com | Images by: unsplash.com | Forms modified from MDBBootstrap.com</p>
    </div>
  </MDBFooter>
  )
}

export default Footer
