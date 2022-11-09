const mongoose = require ('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    about: {
        type: String,
        required: false
    },
    payment: {
        type: String,
        required: false
    },
    id:{
        type: String
    }
})


module.exports = mongoose.model('users', usersSchema);