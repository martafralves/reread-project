import {Form} from 'react-bootstrap';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import registration from '../images/registration.avif';

//import '../styles/register-form.css';
// form template modified from this open source form: https://mdbootstrap.com/docs/react/extended/bootstrap-address-form/#address-form-image

function SignUp() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    cpassword: ''
  })

  const {name, email, username, password, cpassword} = formData


  const {register, handleSubmit, formState: {errors}} = useForm()

  function onChange(e){
    e.preventDefault()
    setFormData(e.target.value)
  }

  function onSubmit(e){
    e.preventDefault()
  }

  return (
    <MDBContainer className="py-5" style={{ maxWidth: '900px' }}>
      <Form onSubmit={ () => {handleSubmit(); onSubmit()}}>
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
                    <MDBInput id = 'name' label='Name' type='text' size="lg" value = {name} 
                    {...register('name', {required: true})} onChange={onChange}/>
                    {errors.name?.type==='required' && (<p className="errorMsg">Name is required.</p>)}
                  </MDBCol>
                  <MDBCol md="6" className="mb-4">
                    <MDBInput id='username' label='Username' type='text' size="lg"value = {username} 
                    {...register('username', {required: true})} onChange={onChange} />
                    {errors.username?.type==='required' && (<p className="errorMsg">Username is required.</p>)}
                  </MDBCol>
                </MDBRow>
                <MDBInput id='email' label='Email' type='email' className="mb-4" size="lg" value = {email}
                {...register('email', {required: true, pattern:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} onChange={onChange}/>
                {errors.email?.type==='required' && (
                  <p className="errorMsg">Email is required.</p>)}
                {errors.email?.type==='pattern' && 'Please enter a valid email'}
                <MDBInput id='password'label='Password' type='password' className="mb-4" size="lg" value = {password} 
                {...register('password', {required: true, minLength:8})} onChange={onChange}/>
                {errors.password?.type==='required' && (
                  <p className="errorMsg">Password is required.</p>)}
                {errors.password?.type==='minLength' && (<p className="errorMsg">Your password should be more than 8 characters.</p>)}
                <MDBInput id='cpassword' label='Confirm password' type='password' className="mb-4" size="lg" value = {cpassword}
                {...register('cpassword', {required: true, minLength:8})} onChange={onChange}/>
                {errors.cpassword?.type==='required' && (
                  <p className="errorMsg">Confirm your password.</p>)}
                <div className="d-flex justify-content-end pt-3">
                  <MDBBtn type='submit' size="lg" className="ms-2" style={{backgroundColor: 'hsl(210, 100%, 50%)'}}>Register</MDBBtn>
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
    
  )
}

export default SignUp
