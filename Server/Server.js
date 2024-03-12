require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()


const port = process.env.PORT
const mongoDbURl = process.env.MONGODBURL


app.get('/',(req, res)=>{
    res.json({message:'Home'})
})
app.get('/api/health',(req, res)=>{
    res.json({message:'Health'})
})

app.listen(port ,()=>{
    try {
        mongoose.connect(mongoDbURl)
        console.log(`server is up at ${port} and DB Connected `)
        
    } catch (error) {
        console.log(error)
    }
})