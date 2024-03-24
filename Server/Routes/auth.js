const express = require('express')
const router = express.Router()
const authController = require('../Controller/User')

router.post('/register', authController.registerUser)
router.post('/login', authController.userLogin)
router.get('/user/:id', authController.getUserDetails)

module.exports = router