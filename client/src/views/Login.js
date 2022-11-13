import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import {loginSchema} from '../schemas/index'
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
import '../styles/login-form.css'

//form template modified from this open source: https://mdbootstrap.com/docs/react/extended/login-form/#section-login-popup-example

function Login() {

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit,
  })



  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError){
     toast.error(message)
    }
 
    if(isSuccess || user){
     navigate('/profile')
    } 
 
    dispatch(reset())
   }, [user, isError, isSuccess, message, navigate, dispatch])
 

  function onSubmit(values){
    dispatch(login(values))
  }

if(isLoading){
  return <Spinner/>
}

  return (
    <MDBContainer fluid>
      <Form onSubmit={handleSubmit}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>

              <MDBInput wrapperClass='mb-4 w-100' name ='email' label='Email address' value={values.email} id='email' type='email' size="lg"
              className={errors.email && touched.email ? "input-error" : ""} 
               onChange={handleChange} onBlur={handleBlur}/>
               {errors.email && touched.email && <p className="error">{errors.email}</p>}
              <MDBInput wrapperClass='mb-4 w-100' name= 'password' label='Password' value={values.password} id='password' type='password' size="lg" 
              className={errors.password && touched.password ? "input-error" : ""}
              onChange={handleChange} onBlur={handleBlur}/>
              {errors.password && touched.password && (<p className="error">{errors.password}</p>)}
              <MDBBtn onClick={handleSubmit} type='submit' size='lg'>
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
