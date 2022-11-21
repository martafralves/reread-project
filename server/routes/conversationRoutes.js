const express = require('express')
const { newConversation, getConversation } = require('../controllers/conversationController')
const router = express.Router()

router.route('/').post(newConversation)
router.route('/:userId').get(getConversation)

module.exports = router;