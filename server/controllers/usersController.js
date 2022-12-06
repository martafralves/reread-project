const User = require('../models/users.model');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require ('axios');
const asyncHandler = require ('express-async-handler');
const config = require('config');

//GET all users
const getUsers = asyncHandler (async (req, res) => {
    const users = await User.find()
    res.status(200). json(users)
})

//GET one user by id
const getOneUser = asyncHandler( async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }
    res.status(200).json(user)
})

//create a user
const registerUser = asyncHandler( async(req, res) => {
    const { name, username, email, password} = req.body

    if(!name || !username || !email || !password || password.length <= 8){
        res.status(400)
        throw new Error('Please complete all the required fields and check if your password matches the requirements')
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //password hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        username
    })

    if(user){
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//update a user
const updateUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, 
        {
            name: req?.body?.name,
            email: req?.body?.email,
            username: req?.body?.username,
            payment: req?.body?.payment,
            about: req?.body?.about,
        
        }, {new: true})

    res.status(200).json(updatedUser)
})

const deleteUser = asyncHandler (async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }
    
    await user.remove()
    res.status(200).json({id: req.params.id})
})

const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body;

    //check user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getUserData = asyncHandler (async (req, res) => {
    const { _id, name, email, username } = await User.findById(req.user._id)

    res.status(200).json({
        id: _id,
        name,
        email,
        username
    })
})

//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '4h',
    })
}


module.exports = {
    getUsers,
    getOneUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserData,
}