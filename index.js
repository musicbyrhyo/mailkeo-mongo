const express = require('express')
const app = express()
const cors = require('cors');
const dbConnect = require('./database/db');
const Router = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
require('dotenv').config()

const PORT = process.env.PORT;
const IP = process.env.IP;

app.listen(PORT , IP , () => {
    console.log(`Server started on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.redirect("/api");
});

app.use('/api',Router)

dbConnect()