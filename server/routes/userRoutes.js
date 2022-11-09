const express = require('express')

const { getUsers, getOneUser, createUser, updateUser, deleteUser, loginController, signUpController } = require('../controllers/usersController')

const router = express.Router()

router.post('/login', loginController)
router.post('/signup', signUpController)

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getOneUser).delete(deleteUser).put(updateUser)

module.exports = router;