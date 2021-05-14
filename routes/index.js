const express = require('express')
const userRouter = require('./user')
const campaignRouter = require('./campaign')
const audienceRouter = require('./audience')
const checkAuth = require('../middlewares/checkAuth')
const subscriberRouter = require('./subscriber')
const Router = express.Router()

Router.use('/user',userRouter)
Router.use('/subscriber',subscriberRouter)
Router.use('/campaign', checkAuth , campaignRouter)
Router.use('/audience', checkAuth , audienceRouter)

module.exports = Router