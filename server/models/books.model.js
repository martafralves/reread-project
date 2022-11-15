const mongoose = require ('mongoose')
var Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        minlength: "3", 
        maxlength: "80"
    },
    description: {
        type: String,
        required: true,
        maxlength: "500"
    },
    price: {
        type: mongoose.Decimal128,
        required: true
    },
    delivery:{
        type: String,
        required: false
    },
    condition:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
    },
})


module.exports = mongoose.model('Books', bookSchema);