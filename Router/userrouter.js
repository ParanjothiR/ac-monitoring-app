const express=require("express")
const router=express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
require('dotenv').config();
const userdb=require("../Model/uservalues")
const devicedb=require("../Model/deviceslist")
const sensordb=require("../Model/sensorvalue");
const deviceslist = require("../Model/deviceslist");

router.get('/',async(req,res)=>{
    try{
       res.redirect('/register')
    }catch(err){
        res.redirect('/register') 
    }
})

router.post('/register',async(req,res)=>{
   // console.log(req.body)
    const {email,pass,phone}=req.body
   /// console.log(pass)
    try{
        const findemail= await userdb.findOne({email:email})
         const hashpassword1 = await hashPassword(pass)
       ///  console.log(hashpassword1.pass1)
        // console.log(findemail)
        if(findemail){
            res.render('register',{message:"You are Already register"})
        }else{
            const userregister= new userdb({
                email,
                password:hashpassword1.pass1,
                phoneno:phone
            })
            await userregister.save()
         //   console.log("sucessfuly register data save in db")
           // res.render('register', { message: 'Successfully registered!..you login your account'})
           res.render('register',{message:"Sucessfully Register"})
        }
    }catch(err){
        res.render('register', { error: err.message });
    }
})

async function hashPassword(pass) {
    try {
        console.log(pass)
      const hash = await bcrypt.hash(pass, 10);
      //console.log(hash);
      return {pass1:hash}
    } catch (error) {
        return {error:error}
    }
  }

const verifyUserlogin=async(email,password)=>{
    try{
       const user=await userdb.findOne({email})
      // console.log(user) 
       if(!user){
           return {status:'error',errors:'user not found'}
       }
       const expiresInThirtyDays = 2592000;
       //console.log("joo")
       if(await bcrypt.compare(password,user.password)){
        console.log("hike")
             token=jwt.sign({
                email:user.email,type:'user'
             },process.env.ACCESS_TOKEN,{expiresIn:expiresInThirtyDays})
             console.log(token)
            return {status:'ok',data:token}
       }  
       return {status:'error',errors:'Invalid Password'}
    }catch(error){
           //console.log(error)
           return {status:'error',errors:'time out'}
    }
}

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    //console.log(req.body)
    try{
        const response=await verifyUserlogin(email,password);
     if(response.status==='ok'){
      //  console.log("joith")
        res.cookie('accesstoken',token,{maxAge:30*24*60*60*1000,httpOnly:true})
        res.redirect('/dashboard')
    }else{
        res.render('register',{errors:response.errors})
    }  
    }catch(err){
          res.render('register',{errors:err})
    }
})

router.get('/dashboard',async(req,res)=>{
    const {accesstoken}=req.cookies
  //  console.log(accesstoken)
    try{
        const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN)
        const email1=verify.email
        var profile=""
        if(email1){
             const k= await userdb.find({email:email1})
             if(k){
                profile=k
                //console.log(profile)
            }
        }
        return res.render('dashboard', { data:profile});  
     }catch(err){
        res.render('dashboard',{error:err,data:profile})
    }
})



router.get('/root',async(req,res)=>{
    const {accesstoken}=req.cookies
  //  console.log(accesstoken)
    try{
        const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN)
        const email1=verify.email
        let latestSensorDataArray = [];
     
        const available=await devicedb.findOne({email:email1})
        console.log(available)
        if (available) {
            for(let i=0 ; i<available.devicesarray.length ; i++){
                console.log(available.devicesarray[i])
                const data=await sensordb.findOne({deviceid:available.devicesarray[i]}).sort({timestamp:-1})
                console.log(data)
                latestSensorDataArray.push(data|| available.devicesarray[i]);
            }
           // console.log('Latest Sensor Data Array:', latestSensorDataArray.map(obj => obj)); 
        } 
        return res.send(latestSensorDataArray)
     }catch(err){
        res.send(err)
    }
})


router.get('/error', (req, res) => {
    res.render('error'); // Render the 'error.hbs' template
  });



router.post('/delete',async(req,res)=>{
    const {deviceId}=req.body;
   // console.log(deviceId)
    const {accesstoken}=req.cookies
   // console.log(accesstoken)
    try{
        const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN)
        const email1=verify.email
      //  console.log(verify.email)
        const available=await devicedb.find({email:email1})
       // console.log(available)
        if(available.length>0){
            const deviceexixts=available[0].devicesarray.includes(deviceId)
         //   console.log(deviceexixts)
           if(deviceexixts){
            await devicedb.updateOne(
                {email:email1},
                { $pull: { devicesarray: deviceId} } // The update operation using $pull
              );
              
           // console.log("sucess do for that")
            res.send("ok")
           }else{
               res.render('/dashboard')
           }
        }else{
            res.render('/dashboard')
        }
       
    }catch(error){
        res.send(error)
    }
    
   
})



router.post('/addid',async(req,res)=>{
        const {deviceid1}=req.body
        const {accesstoken}=req.cookies
        try{
        const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN)
        const email1=verify.email
     //   console.log(verify.email)
        const available=await devicedb.findOne({email:email1})
      //  console.log(available)
        if(!available){
            await devicedb.create({
                email:email1,
                devicesarray: [deviceid1],
              });
        }else{
           const deviceexixts=await available.devicesarray.includes(deviceid1)
           if(!deviceexixts){
               available.devicesarray.push(deviceid1)
               await available.save()
           }
        }
       // console.log("sucess")
        res.redirect('/dashboard')
        }catch(err){
            res.send(err)
        }

}) 
const verifytoken=(accesstoken)=>{
    try{
       const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN)
       console.log(verify.email)
       if(verify.type==='user'){
             return true
       }else{
            return false
       }
    }catch(error){
          return false
    }
}

router.get('/logout', (req, res) => {
    res.clearCookie('accesstoken');
    res.redirect('/register');
  });
  
  router.get('/register',(req,res)=>{
    const {accesstoken}=req.cookies
    if(verifytoken(accesstoken)){
        return res.redirect('/dashboard')
    }else{
        return res.render('register')
    }
})

router.get('/graphs', (req, res) => {
    const { id } = req.query;
    console.log(id)
    res.render('graphs', { id });
  });

router.get('/view',async(req,res)=>{
    console.log("hello")
    const { deviceId } = req.query;
    console.log(deviceId)
    const {accesstoken}=req.cookies
    try{
    const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN)
    const email1=verify.email
    console.log(email1)
    const sensordatas=await sensordb.find({deviceid:deviceId}).sort({timestamp:-1}).limit(10)
    //console.log(sensordatas)
    const singlerecord=await sensordb.findOne({deviceid:deviceId}).sort({ timestamp: -1 })
    console.log(singlerecord)
    sensordatas.reverse()
    console.log(sensordatas)
    const twosensordatas={
        singledata:singlerecord,
        multipledata:sensordatas
    }
   // console.log(sesensordatas)
        res.send(twosensordatas)

       
    }catch(err){
        res.render('error');
    }
})

router.get('/dbview',async(req,res)=>{
    console.log("hello")
    const { deviceId } = req.query;
    console.log(deviceId)
    const {accesstoken}=req.cookies
    try{
    const verify=jwt.verify(accesstoken,process.env.ACCESS_TOKEN)
    const email1=verify.email
    console.log(email1)
    const singlerecord=await sensordb.findOne({deviceid:deviceId}).sort({ timestamp: -1 })
    console.log(singlerecord)
     res.send(singlerecord)
       
    }catch(err){
        res.render('error');
    }
})

module.exports=router