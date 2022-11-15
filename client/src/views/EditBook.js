import {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Form from 'react-bootstrap/Form';
import {useFormik} from 'formik'
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import {addbookSchema} from '../schemas/index';
import {updateBook, getSingleBook, reset} from '../features/books/bookSlice'
import { MDBRow, MDBCol, MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import '../styles/login-form.css'


function EditBook() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

   

    const {user} = useSelector((state) => state.auth)
    const {book, isLoading, isError, isSuccess, message} = useSelector((state) =>state.books)


    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
        title: '',
        author: '',
        price: '',
        language: '',
        condition: '',
        status: '',
        delivery: '',
        description: ''
      },
      validationSchema: addbookSchema,
      onSubmit,
    })

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
        if(isError){
            toast.error(message)
           }
        
        dispatch(getSingleBook(book))

        if(book){
            values = {...book}
        }
    }, [book, user, isError, isSuccess, navigate, dispatch, message])

    function onSubmit(values){
        dispatch(updateBook(values))
    }

    if(isLoading){
        return <Spinner/>
      }
    
  return (
    <div className='container bookform-container m-4 pt-2'>
        <h2 className='bookform-title'>Edit book information</h2>
        <p>Please provide information on the book you are selling</p>
    <Form onSubmit={handleSubmit}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='title' label='Book Title' name='title' type = 'text' value = {values.title}
          className={errors.title && touched.title ? "input-error" : ""}
          onChange={handleChange} onBlur={handleBlur}/>
          {errors.title && touched.title && <p className="error">{errors.title}</p>}
        </MDBCol>
        <MDBCol>
          <MDBInput id='author' label='Author(s)' name='author' type='text' value = {values.author} 
          className={errors.author && touched.author ? "input-error" : ""}
          onChange={handleChange} onBlur={handleBlur}/>
          {errors.author && touched.author && <p className="error">{errors.author}</p>}
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='price' label='Book price (€)' name='price'  type='text' value = {values.price}
          className={errors.price && touched.price ? "input-error" : ""}
          onChange={handleChange} onBlur={handleBlur}/>
          {errors.price && touched.price && <p className="error">{errors.price}</p>}
        </MDBCol>
        <MDBCol>
          <MDBInput id='language' label='Language' name='language' type='text' value = {values.language}
          className={errors.language && touched.language ? "input-error" : ""}
          onChange={handleChange} onBlur={handleBlur}/>
          {errors.language && touched.language && <p className="error">{errors.language}</p>}
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='condition' label='Book condition (i.e. used)' name='condition' type='text' value = {values.condition}
          className={errors.condition && touched.condition ? "input-error" : ""}
          onChange={handleChange} onBlur={handleBlur}/>
          {errors.condition && touched.condition && <p className="error">{errors.condition}</p>}
        </MDBCol>
        <MDBCol>
            <Form.Select aria-label='Select Status' name='status' id= 'status' 
            value = {values.status}
            className={errors.status && touched.status ? "input-error" : ""}
            onChange={handleChange} onBlur={handleBlur}>
                <option value='' label = 'Select status'>Select Status</option>
                <option value = 'Available' label= 'Available'>Available</option>
                <option value = 'Reserved' label = 'Reserved'>Reserved</option>
                <option value = 'Sold' label = 'Sold'>Sold</option>
            </Form.Select>
            {errors.status && touched.status && <p className="error">{errors.status}</p>}
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-4'>
        <MDBCol>
        <MDBInput id='delivery' label='Delivery (i.e. included in price)' name='delivery' type='text' value = {values.delivery}
        className={errors.delivery && touched.delivery ? "input-error" : ""}
        onChange={handleChange} onBlur={handleBlur}/>
        {errors.delivery && touched.delivery && <p className="error">{errors.delivery}</p>}
        </MDBCol>
      </MDBRow>
      <MDBInput wrapperClass='mb-4' textarea id='description' rows={4} name = 'description' label='Book description (if you are open for a swap, state here too)' value = {values.description}
       className={errors.description && touched.description ? "input-error" : ""}
       onChange={handleChange} onBlur={handleBlur}/>
       {errors.description && touched.description && <p className="error">{errors.description}</p>}
      <MDBBtn onClick={handleSubmit} className='mb-4' type='submit' block>
        Update book
      </MDBBtn>
    </Form>
    </div>
  )
}

export default EditBook
