// import controllers review, products
const authController = require('../controllers/authController.js')

// router
const router = require('express').Router()


// use routers

//create new user router
router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router