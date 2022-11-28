import {Form} from 'react-bootstrap';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {registerSchema} from '../schemas/index';
import {useFormik} from 'formik'
import registration from '../images/registration.avif';
import Spinner from '../components/Spinner';
import '../styles/login-form.css'
// form template modified from this open source form: https://mdbootstrap.com/docs/react/extended/bootstrap-address-form/#address-form-image

function SignUp() {

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
    name: '',
    email: '',
    username: '',
    password: '',
    cpassword: ''
  },
  validationSchema: registerSchema,
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
    dispatch(registerUser(values))
  }


  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className='register-wrapper'>
    <MDBContainer className="py-5" style={{ maxWidth: '900px' }}>
      <Form onSubmit={handleSubmit}>
    <MDBRow className="justify-content-center align-items-center">
      <MDBCol>
        <MDBCard className="my-4 shadow-3">
          <MDBRow className="g-0">
            <MDBCol md="6" className="d-xl-block bg-image">
              <MDBCardImage src={registration} alt="Register form photo. Source: unsplash.com" fluid />
              <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
              </div>
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="p-md-5 text-black">
                <MDBTypography tag="h3" className="mb-4 text-uppercase">Sign Up</MDBTypography>
                <MDBRow>
                  <MDBCol md="6" className="mb-4">
                    <MDBInput id = 'name' name='name' label='Name' type='text' size="lg" value = {values.name} 
                    className={errors.name && touched.name ? "input-error" : ""}
                    onChange={handleChange} onBlur={handleBlur}/>
                    {errors.name && touched.name && <p className="error">{errors.name}</p>}
                  </MDBCol>
                  <MDBCol md="6" className="mb-4">
                    <MDBInput id='username' name='username' label='Username' type='text' size="lg" value = {values.username}
                    className={errors.username && touched.username ? "input-error" : ""}
                    onChange={handleChange} onBlur={handleBlur} 
                   />
                   {errors.username && touched.username && <p className="error">{errors.username}</p>}
                  </MDBCol>
                </MDBRow>
                <MDBInput id='email' name='email' label='Email' type='email' className={errors.email && touched.email ? "input-error mb-4" : "mb-4"} size="lg" value={values.email}
                onChange={handleChange} onBlur={handleBlur}
                />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
                <MDBInput id='password' name='password' label='Password' type='password' 
                className={errors.password && touched.password ? "input-error mb-4" : "mb-4"} size="lg" 
                value = {values.password} onChange={handleChange} onBlur={handleBlur}
                />
                {errors.password && touched.password && (<p className="error">{errors.password}</p>)}
                <MDBInput id='cpassword' name='cpassword' label='Confirm password' type='password' 
                className={errors.cpassword && touched.cpassword ? "input-error mb-4" : "mb-4"} size="lg" 
                value = {values.cpassword} onChange={handleChange} onBlur={handleBlur}/>
                {errors.cpassword && touched.cpassword && (<p className="error">{errors.cpassword}</p>)}
                <div className="d-flex justify-content-end pt-3">
                  <MDBBtn onClick={handleSubmit} type='submit' size="lg" className="ms-2" style={{backgroundColor: 'hsl(210, 100%, 50%)'}}>Register</MDBBtn>
                </div>
                <div className="d-flex justify-content-end pt-3"><span>Already have an account?<a href='/login'> Login</a></span></div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </Form>
  </MDBContainer>
  </div>
  )
}

export default SignUp
