const express=require("express")
const router=express.Router()
const jwt = require("jsonwebtoken")
const validateToken=require("../Middleware/validateToken")
const userdb=require("../Model/uservalues")

router.post('/register',async(req,res)=>{
    const {deviceid,email,password}=req.body
    console.log(req.body)
    try{
        const id= await userdb.findOne({deviceid})

        if(id){
            res.send("you already register")
        }else{
            res.send("sucessfully register")
            const userregister= new userdb({
                deviceid,
                email,
                password
            })
            await userregister.save()
            console.log("sucessfuly register data save in db")
        }
    }catch(err){
        res.send(err)
    }
})

  
router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    //console.log(req.body)
    try{
        const data= await userdb.findOne({email})

        if(!data){
            res.send("your email id incorect")
        }else{
            const pass=data.password
            if(pass===password){
            res.send("susessfully login the user")
            const expiresInOneMonth = 30 * 24 * 60 * 60
            console.log(expiresInOneMonth)
             const  accessToken=jwt.sign({
                user:{
                    deviceid:data.deviceid,
                    email:data.email
                }
              }, process.env.ACCESS_TOKEN,
                { expiresIn: expiresInOneMonth }
             )
             console.log(accessToken)
            }else{
                res.send("your password is incorect")
            }
        }
       // console.log(data);
       
      
    }catch(err){
          res.send(err)
    }
})



module.exports=router