const Message = require('../models/message.model');
const asyncHandler = require ('express-async-handler');


//add message
const newMessage = asyncHandler( async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please type a message!')
    }
    const message = await Message.create(req.body)
    res.status(200).json(message)
})

//get messages

const getMessages = asyncHandler( async(req, res) => {
    
    const messages = await Message.find({
        conversationId:req.params.conversationId
    })
    res.status(200).json(messages)
})

module.exports = {
    newMessage,
    getMessages
}