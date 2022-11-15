import * as yup from 'yup';

const pwdRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
//at least 8 characters, must contain at least 1 uppercase letter, 1 lower case and 1 number.
//Taken from https://regexr.com/729m8

const priceRule = /^\d+(,\d{3})*(\.\d{1,2})?$/
//check valid prices 

export const loginSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(8).required('Password is required')
})


export const registerSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    name: yup.string().required('Required field').min(2),
    password: yup.string().min(8).required('Password is required').matches(pwdRules, {message: 'Password must contain at least 8 chars, 1 lower & 1 upper case & a number'}),
    username: yup.string().required('Username is required').min(3, "Username must be at least 3 characters long"),
    cpassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Please confirm your password"),
})

export const addbookSchema = yup.object().shape({
    title: yup.string().required('Please input a title').min(2),
    author: yup.string().required('Please add an author').min(2),
    condition: yup.string().required('Condition is required'),
    price: yup.string().required('Please input a price').matches(priceRule, {message:'Please input a valid price'}),
    status: yup.string().required('Status is required'),
    description: yup.string().required('Please provide a small description').min(20)
})