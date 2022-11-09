import {Form, Button} from 'react-bootstrap';

import '../styles/login-form.css';
// form template modified from this open source https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/

function SignUp() {
  return (
    <div className="signup-form-container">
      <Form>
      <h4 className='login-form-title'>Sign Up</h4>
    <Form.Group className="mb-3">
      <Form.Label className='login-label'>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter your name" />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label className='login-label'>Username</Form.Label>
      <Form.Control type="text" placeholder="Choose a username" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label className='login-label'>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter your email" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label className='login-label'>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter your password" />
    </Form.Group>
    <Form.Group>
    <Button variant="primary">Sign Up</Button>
      <span className='login-form-span'><a href='/login'>Already have an account?</a></span>
  </Form.Group>
  <hr/>
  <h6 className='login-form-title'>OR</h6>
  <Button className='google-button'>
    <i class="fa-brands fa-google"></i>  Sign up with google</Button>
</Form>
    </div>
  )
}

export default SignUp
