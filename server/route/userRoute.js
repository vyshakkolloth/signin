const express = require('express')
const Authentication = require('../controller/userController')
const router = express.Router()


router.post("/signup",Authentication.signup)
router.post("/login",Authentication.login)



module.exports = router