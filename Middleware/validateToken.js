const jwt=require("jsonwebtoken")

const validateToken=async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decode)=>{

        if(err){
            res.send(err)
        }
        req.user=decode.user
        next()
        
    })
       if(!token){
        req.send("the token is not create")
       }
    }
}
module.exports=validateToken