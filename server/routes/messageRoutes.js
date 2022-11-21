const express = require('express')
const { newMessage, getMessages } = require('../controllers/messageController')
const router = express.Router()

router.route('/').post(newMessage)
router.route('/:conversationId').get(getMessages)


module.exports = router;