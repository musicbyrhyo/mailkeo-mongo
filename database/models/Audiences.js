const mongoose = require('mongoose')

const AudienceSchema = mongoose.Schema({

    a_owner: {
        type: String,
        required: true
    },
    a_name: {
        type: String,
        required: true,
    },
    a_uri: {
        type: String,
        required: true,
    },
    a_created: Date,
    a_subscribers: [{
        s_name: String,
        s_email: String
    }]

})

module.exports = mongoose.model('Audiences',AudienceSchema)