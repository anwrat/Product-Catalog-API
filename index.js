const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
app.use(express.json())

//Importing dotenv
require('dotenv').config()

const Router = require('./routes/route')
app.use('/blog',Router)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('Connected to database')})
.catch((error)=>{console.log(error)})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})