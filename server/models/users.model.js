const mongoose = require ('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a Name']
    },
    email: {
        type: String,
        required: [true, 'Please add an Email']
    },
    password: {
        type: String,
        required: [true, 'Please add a Password']
    },
    username: {
        type: String,
        required: [true, 'Please add a Username']
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
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }
})


module.exports = mongoose.model('users', usersSchema);