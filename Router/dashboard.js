const express=require("express")
const router=express.Router()
const dbstore = require("../Model/sensorvalue");
const validatesensordata = require("../Middleware/validatesensordata");
const validateToken=require("../Middleware/validateToken")

router.get('/',validateToken,async(req,res)=>{
    console.log(req.user.deviceid)
    
    try{
        const  data= await dbstore.findOne({
            deviceid: req.user.deviceid
        }).sort({ timestamp: -1 }) // Sort in descending order of timestamp
        res.json(data)

    }catch(err){
        res.send(err)
    }
})
module.exports=router