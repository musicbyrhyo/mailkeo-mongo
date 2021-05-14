const express = require('express')
const reset = require('../user/reset')
const login = require('../user/login')
const register = require('../user/register')
const configure = require('../user/configure')
const checkAuth = require('../middlewares/checkAuth')
const userRouter = express.Router()

userRouter.get('/',(req,res)=>{
    res.status(200).send('Hello')
})

userRouter.post('/login',login)
userRouter.post('/register',register)
userRouter.post('/reset', reset)
userRouter.post('/configure', checkAuth ,configure)

module.exports = userRouter