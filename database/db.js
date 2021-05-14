const mongoose = require('mongoose')

const dbConnect = async () => {

    try {

        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = dbConnect