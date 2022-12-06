const express = require('express')
const { newConversation, getConversation, findConversation } = require('../controllers/conversationController')
const router = express.Router()

router.route('/').post(newConversation)
router.route('/:userId').get(getConversation)
router.route('/:firstUserId/:secondUserId').get(findConversation)

module.exports = router;