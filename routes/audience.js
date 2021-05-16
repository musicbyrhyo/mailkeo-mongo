const express = require('express')
const createAudience = require('../audience/create')
const deleteAudience = require('../audience/delete')
const getAudience = require('../audience/get')
const getAudiences = require('../audience/getAudiences')
const getAllAudience = require('../audience/getAll')
const audienceRouter = express.Router()

audienceRouter.get('/',(req,res)=>{
    res.status(200).send('Hello')
})

audienceRouter.post('/create', createAudience)
audienceRouter.post('/delete', deleteAudience)
audienceRouter.post('/get', getAudience)
audienceRouter.post('/all', getAllAudience)
audienceRouter.post('/names', getAudiences)

module.exports = audienceRouter