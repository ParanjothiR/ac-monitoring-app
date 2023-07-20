//const validateToken = require("./validateToken");
const nodemailer = require('nodemailer');
const dbstore = require("../Model/sensorvalue");
const dbstore1=require("../Model/uservalues")
let timecalc=0;
let messagetime=0;
let watertime1=0;
let watertime2=0
let emailContent=""
async function validatesensordata(req,data) {
    const deviceId = req.deviceid;
    const userdb = await dbstore1.findOne({deviceId})
    console.log(userdb)
    const userEmail = userdb.email
    console.log(userEmail)
    
    
    
    try {
        // Fetch the last three sensor data records for the given device ID
        // Limit to the last three records
       
        if(data.acState==='ac on'){
            let water=parseFloat(data.waterLevelPercentage)
            console.log(water)
           
            if(watertime1==0){
               if(water>=40.0 && water<=50.0){
                  watertime1=1
                  console.log("water")
                emailContent="your air conditioner tray water level is increase you servicing in your air conditioner"
                  message(userEmail,)
              }
           }
           if(watertime2==0){
            if(water>50.0){
                watertime2=1
                emailContent="your air conditioner tray water level is increase you are suddenly checking and servicing in your air conditioner"
                message(userEmail,)
           }
        }

     timecalc+=2;
    if(timecalc>=10){    
        const sensorData = await dbstore.find({
            deviceid: deviceId,
            acState: "ac on",
          })
          .sort({ timestamp: -1 }) // Sort in descending order of timestamp
          .limit(3);
          // Limit to the last three records
          //console.log(sensorData)
        let count=1;
        let acnumber=parseInt(data.acno);
        let temperature=parseFloat(data.temperature);
        let alert=0;
        for (const data of sensorData) {
            //emailContent += `Timestamp: ${data.timestamp}, temperatureValue: ${data.temperature},Acstatus:${data.acState},Acno:${data.acno}\n`;

               if(temperature>27.00){
                    alert=1;
                    count++;
               } 
        }
        console.log(alert)
        console.log(count)
        if(alert==1 && count==4){
           messagetime+=2;
        // Create a Nodemailer transporter
        if(messagetime===2){
         emailContent=`your air conditioner On ${acnumber} sensor/But your air conditioner is not giving the cooling  ${temperature}`
         message(userEmail,)
         alert=0;
        // // Call the sendEmail function and pass the transporter as an argument
       
        }else if(messagetime===180){
            messagetime=0;
        }
        }
 
     }
    }else{
    timecalc=0;
    messagetime=0;
    watertime1=0;
    watertime2=0
        console.log("Ac is off")
    }
    } catch (error) {
        console.error('Error retrieving and sending data:', error);
    }
}
async function  message(userEmail){
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: '2012103@nec.edu.in', // Replace with your email address
            pass: 'Paranjothi@123'   // Replace with your email password or app password
        }
    });
    sendEmail(userEmail, 'Ac monitoring in water and air conditioner cooling', emailContent, transporter);
}

async function sendEmail(recipientEmail, subject, content, transporter) {
    console.log("enter")
    const mailOptions = {
        from: '2012103@nec.edu.in', // Replace with your sender email address
        to: recipientEmail,           // Recipient email address
        subject: subject,             // Email subject
        text: content                 // Plain text content of the email
        // You can also use 'html' key to send HTML content instead of plain text
    };
    
    try {
        console.log("entry1")
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = validatesensordata;
