const express = require('express')
const getlist = require('../subscriber/getlist')
const subscribe = require('../subscriber/subscribe')
const unsubscribe = require('../subscriber/unsubscribe')
const subscriberRouter = express.Router()

subscriberRouter.get('/',(req,res)=>{
    res.status(200).send('Hello')
})

subscriberRouter.post('/subscribe',subscribe)
subscriberRouter.post('/unsubscribe',unsubscribe)
subscriberRouter.post('/check',getlist)


module.exports = subscriberRouter