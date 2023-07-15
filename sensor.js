const express=require("express")
const app=express()
require('dotenv').config();
const mongoose=require("mongoose")
const url=process.env.URL

const port=process.env.PORT

mongoose.connect(url,{useNewUrlParser:true})
const cons=mongoose.connection
cons.on('open',()=>{
     console.log("connect...")
})

 
app.post('/api/sensordata',(req,res)=>{
    const {temperature,waterLevelPercentage,acState,acno,deviceid}=req.body
    if(deviceid=="#1A6B9C"){
        console.log(req.body)
    }
    res.status(500).json({message:"get the post sucessfully"})
})
app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})