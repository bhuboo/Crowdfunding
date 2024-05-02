// import controllers review, products
const authController = require('../controllers/authController.js')

// router
const router = require('express').Router()


// use routers

//create new user router
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/forget', authController.forgetemail)
router.post('/forgetOTP', authController.forgetotp)
router.post('/forgetPasschange', authController.forgetPasschange)


module.exports = router