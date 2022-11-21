const Conversation = require('../models/conversation.model');
const asyncHandler = require ('express-async-handler');


//new conversation
const newConversation = asyncHandler( async(req, res) => {
    
    const conversation = await Conversation.create({
       members: [req.body.senderId, req.body.receiverId]
    })
    res.status(200).json(conversation)
})

//get conversation of a user
const getConversation = asyncHandler( async(req, res) => {
    
    const conversation = await Conversation.find({
        members: {$in:[req.params.userId]},
    })
    res.status(200).json(conversation)
})

module.exports = {
    newConversation,
    getConversation
}