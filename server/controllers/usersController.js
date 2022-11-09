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
const createUser = asyncHandler( async(req, res) => {
    if(!req.body.name || !req.body.username || !req.body.email || !req.body.password || req.body.password.length <= 8){
        res.status(400)
        throw new Error('Please complete the required fields and check if your password matches the requirements')
    }

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        about: req.body.about,
        payment: req.body.payment
    })
    res.status(200).json(user)
})

//update a user
const updateUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

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


const loginController = async(req, res) => {
    if(req.body.googleAccessToken){//oauth
        axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                "Authorization": `Bearer ${req.body.googleAccessToken}`
            }
        }).then (async response => {
            const email = response.data.email;
            const alreadyExists = await User.findOne({email});
            if(!alreadyExists)
                return res.status(400).json({message: "User does not exist!"})
            
            const token = jwt.sign({
                email: alreadyExists.email,
                id: alreadyExists._id
            }, config.get("JWT_SECRET"), {expiresIn: '1h'})

            res.status(200).json({result: alreadyExists, token})
        })
    }else{
        //get email and pwd from form
        const {email, password} = req.body;

        if(!email || !password)
        return res.status(400).json({message:'Invalid fields'})

        try{
            const alreadyExists = await User.findOne({email});
            if(!alreadyExists)
                return res.status(400).json({message: "User does not exist!"})
            
            const passwordCheck = await bcrypt.compare(password, alreadyExists.password);

            if(!passwordCheck) return res.status(400).json({message: 'Invalid info'})

            const token = jwt.sign({
                email: alreadyExists.email,
                id: alreadyExists._id
            }, config.get("JWT_SECRET"), {expiresIn:'1h'})

            res.status(200).json({result: alreadyExists, token})
        }catch(err){
            console.log(err)
        }

    }
}

const signUpController = async(req, res) => {
    if(req.body.googleAccessToken){ //google oauth
        axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                "Authorization": `Bearer ${req.body.googleAccessToken}`
            }
        }).then (async response => {
            const name = response.data.given_name;
            const email = response.data.email;

            const alreadyExists = await User.findOne({email});
            if(alreadyExists){
                return res.status(400).json({message: "User already exists!"})
            }
            const result = await User.create({name, email})
            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, config.get('JWT_SECRET'), {expiresIn:'1h'})

            res.status(200).json({result, token})
        }).catch(err =>{
            res.status(400).json({message:'Invalid information'})
        })
    }else{ //normal form
        const {email, name, confirmPassword, password, username} = req.body;
        try{
            if(!email || !name || !password || !password.length <= 8 || !confirmPassword || !username)
                res.status(400).json({message: 'Invalid fields'})

            const alreadyExists = await User.findOne({email});
                if(alreadyExists){
                    return res.status(400).json({message: "User already exists!"})
                }

                const hashPwd = await bcrypt.hash(password, 12)
                const result = await User.create({password: hashPwd, name, email, username})
                const token = jwt.sign({
                    email: result.email,
                    id: result._id
                }, config.get('JWT_SECRET'), {expiresIn:'1h'})
    
                res.status(200).json({result, token})
            
            
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    loginController,
    signUpController
}