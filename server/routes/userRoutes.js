const express = require('express')

const { getUsers, getOneUser, registerUser, updateUser, deleteUser, loginUser, getUserData, loginController, signUpController } = require('../controllers/usersController')

const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUserData)

router.route('/').get(getUsers)
router.route('/:id').delete(deleteUser).put(protect, updateUser)

module.exports = router;