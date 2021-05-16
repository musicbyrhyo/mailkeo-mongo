const express = require('express')
const createCampaign = require('../campaign/create')
const getCampaign = require('../campaign/get')
const getAllCampaign = require('../campaign/getAll')
const deleteCampaign = require('../campaign/delete')
const startCampaign = require('../campaign/start')
const campaignRouter = express.Router()

campaignRouter.get('/hello',(req,res)=>{
    res.status(200).send(req.user._id)
})

campaignRouter.post('/create',createCampaign)
campaignRouter.post('/get',getCampaign)
campaignRouter.post('/getall',getAllCampaign)
campaignRouter.post('/delete',deleteCampaign)
campaignRouter.post('/start',startCampaign)

module.exports = campaignRouter