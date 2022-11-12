import { useForm } from 'react-hook-form';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import {useState, useEffect} from 'react'
import {Form} from 'react-bootstrap';
//import '../styles/login-form.css';

//form template modified from this open source: https://mdbootstrap.com/docs/react/extended/login-form/#section-login-popup-example
function Login() {

  const [formData, setFormData] = useState({email:'', password:''})
  const {email, password} = formData

  const {register, handleSubmit, formState: { errors }} = useForm();

  function onChange(e){
    e.preventDefault()
    setFormData(e.target.value)
  }

  function onSubmit(e){
    e.preventDefault()
  }



  return (
    <MDBContainer fluid>
      <Form onSubmit={() => {handleSubmit(); onSubmit()}}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' value={email} id='email' type='email' size="lg" 
              {...register('email', {required:true})} onChange={onChange}/>
              {errors.email?.type==='required' && 'Email is required'}
              <MDBInput wrapperClass='mb-4 w-100' label='Password' value={password} id='password' type='password' size="lg" 
              {...register('password', {required:true})} onChange={onChange}/>
              {errors.password?.type==='required' && 'Password is required'}
              <MDBBtn size='lg'>
                Login
              </MDBBtn>

              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Sign in with google
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>
      </Form>
    </MDBContainer>

  )
}

export default Login
