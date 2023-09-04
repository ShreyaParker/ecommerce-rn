const express = require ( "express")
const bodyParser =require("body-parser")
const mongoose = require("mongoose")
const crypto = require ( "crypto")
const User = require("./models/user")
const jwt = require ( "jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const cors = require ( "cors")
const app= express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log("server listening")
})

