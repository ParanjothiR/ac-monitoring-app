const accountSid = "AC13a003e2641d5e0c4fe9fb540a833d32";
const authToken = "3b6e9d1ce0bad00044b1813f16bab711";
const client = require('twilio')(accountSid, authToken);
const http = require("http")
const url = require("url")

const server = http.createServer(async(req,res)=>{

    const urlStr = url.parse(req.url,true)
    
    // const phone = '+'+urlStr.query.phone.trim()

    // const msg = urlStr.query.message

    // console.log(phone);

    const data = await client.messages
    .create({
        body: 'hii',
        from: '+17622543999',
        to: '+917339481637'
    })

    // console.log(data);
    console.log("Message sent successfully");
        
    res.end("Hello World")
})

server.listen(3001,"127.0.0.1",()=> console.log("Server is running"))