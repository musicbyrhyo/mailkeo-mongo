const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({

    u_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    u_email: {
        type: String,
        required: true,
        unique: true
    },
    u_password: {
        type: String,
        required: true
    },
    mail_server:{
        hostname: String,
        port: {
            type: Number,
            default: 587
        },
        secure: {
            type: Boolean,
            default: false
        },
        auth: {
            username: String,
            password: String
        }
    },
    u_audiences: [{
        type: String
    }],
    u_campaigns: [{
        type: String
    }]
})

module.exports = mongoose.model('Users',UsersSchema)