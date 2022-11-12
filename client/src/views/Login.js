import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
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
import {Form} from 'react-bootstrap';

//form template modified from this open source: https://mdbootstrap.com/docs/react/extended/login-form/#section-login-popup-example

function Login() {

  const [formData, setFormData] = useState({email:'', password:''})
  const {email, password} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  const {register, handleSubmit, formState: { errors }} = useForm();

  useEffect(() => {
    if(isError){
     toast.error(message)
    }
 
    if(isSuccess || user){
     navigate('/profile')
    } 
 
    dispatch(reset())
   }, [user, isError, isSuccess, message, navigate, dispatch])
 
   const onChange = (e) => {
     setFormData((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value
     }))
   }
 

  function onSubmit(e){
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

if(isLoading){
  return <Spinner/>
}

  return (
    <MDBContainer fluid>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>

              <MDBInput wrapperClass='mb-4 w-100' name ='email' label='Email address' value={email} id='email' type='email' size="lg" 
              {...register('email', {required:true})} onChange={onChange}/>
              {errors.email?.type==='required' && (
                  <p className="errorMsg">Email is required.</p>)}
                {errors.email?.type==='pattern' && (<p className="errorMsg">Please enter a valid email.</p>)}
              <MDBInput wrapperClass='mb-4 w-100' name= 'password' label='Password' value={password} id='password' type='password' size="lg" 
              {...register('password', {required:true})} onChange={onChange}/>
              {errors.password?.type==='required' && (<p className="errorMsg">Password is required.</p>)}
              <MDBBtn onClick={onSubmit} size='lg'>
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
