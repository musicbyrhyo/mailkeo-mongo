const express = require('express')
const subscribe = require('../subscriber/subscribe')
const unsubscribe = require('../subscriber/unsubscribe')
const subscriberRouter = express.Router()

subscriberRouter.get('/',(req,res)=>{
    res.status(200).send('Hello')
})

subscriberRouter.post('/subscribe',subscribe)
subscriberRouter.post('/unsubscribe',unsubscribe)


module.exports = subscriberRouter