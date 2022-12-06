import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Form from 'react-bootstrap/Form';
import {useFormik} from 'formik'
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { MDBRow, MDBCol, MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import {registerSchema} from '../schemas/index';
import '../styles/login-form.css'
import { updateUser, reset } from '../features/auth/authSlice';

function EditProfile() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
        email: user?.email ||'',
        username: user?.username ||'',
        about: user?.about || '',
        payment: user?.payment ||'',
        name: user?.name ||'',
      },
      validationSchema: registerSchema,
      onSubmit,
    })

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
        if(isError) {
            toast.error(message)
        }

        if(isSuccess){
            toast.success('Profile updated!')
            navigate('/profile')
        }

    }, [values, user, navigate, isError, isSuccess, message, dispatch])

    function onSubmit(e){
      const  updatedUser = {
        name: values.name,
        email: values.email,
        username: values.username,
        payment: values.payment,
        about: values.about,

      };
      dispatch(updateUser(updatedUser))
    }

    /*const handleOnChange = (event: FormEvent) => {
      console.log('Form:: onChange', event)
    }*/
    
    if(isLoading){
        return <Spinner/>
    }

  return (
    <div className='bookform-wrapper'>
    <div className='container bookform-container m-4 pt-2'>
        <h2 className='editprofile-title'>Edit Profile information</h2>
    <Form>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='name' label='Name' name='name' type = 'text' value = {values.name}
          className={errors.name && touched.name ? "input-error" : ""}
          onChange={handleChange} onBlur={handleBlur}/>
          {errors.name && touched.name && <p className="error">{errors.name}</p>}
        </MDBCol>
        <MDBCol>
          <MDBInput id='username' label='Username' name='username' type='text' value = {values.username} 
          className={errors.username && touched.username ? "input-error" : ""}
          onChange={handleChange} onBlur={handleBlur}/>
          {errors.username && touched.username && <p className="error">{errors.username}</p>}
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput  disabled={true} id='email' label='Email' name='email'  type='text' value = {values.email}
          onChange={handleChange} onBlur={handleBlur}/>
        </MDBCol>
        <MDBCol>
          <MDBInput id='payment' label='Preferred Payment method' name='payment' type='text' value = {values.payment}
          className={errors.payment && touched.payment ? "input-error" : ""}
          onChange={handleChange} onBlur={handleBlur}/>
          {errors.payment && touched.payment && <p className="error">{errors.payment}</p>}
        </MDBCol>
      </MDBRow>
      <MDBInput wrapperClass='mb-4' textarea id='about' rows={4} name = 'about' label='About me' value = {values.about}
       className={errors.about && touched.about ? "input-error" : ""}
       onChange={handleChange} onBlur={handleBlur}/>
       {errors.about && touched.about && <p className="error">{errors.about}</p>}
      <MDBBtn onClick={handleSubmit} type='submit' className='updateprofile-btn mb-4' block>
        Update profile
      </MDBBtn>
    </Form>
    </div>
    </div>
  )
}

export default EditProfile