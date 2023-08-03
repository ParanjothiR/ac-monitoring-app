//const validateToken = require("./validateToken");

require('dotenv').config();

const nodemailer = require('nodemailer');
const db = require("../Model/sensorvalue")
//const dbstore = require("../Model/uservalues")
const devicelist = require("../Model/deviceslist")
let timecalc = 0;
let messagetime = 0;
let watertime1 = 0;
let emailContent = ""
async function validatesensordata(data) {
    try {
        if (data.acState === 'AC ON') {
            let water = parseFloat(data.waterLevelPercentage)
            console.log(water)
            if (watertime1 == 0) {
                if (water >40.0) {
                    watertime1 = 1
                    //console.log("water")
                    emailContent = "your air conditioner tray water level is increase you servicing in your air conditioner"
                    const query={"devicesarray":data.deviceid}
                    const projection = { "email": 1, "_id": 0 };
                    const result = await devicelist.find(query, projection);
                
                    if (result && result.length > 0) {
                    const firstEmail = result[0].email;
                     message( firstEmail, emailContent)
                }
            }

            }
            timecalc += 1;
            console.log(timecalc)
            if (timecalc >= 5 && messagetime==0) {

                const sensorData = await db.find({
                    deviceid:data.deviceid
                }) .sort({ _id: -1 }) 
                    .limit(5);
                //console.log(sensorData)
                let count = 0;
                let acnumber = parseInt(data.acno);
                let temperature1
               // console.log(temperature1)
                let alert = 0;
                for (const gdata of sensorData) {
                    
                    if (count==0) {
                        temperature1=gdata.temperature
                        count++
                    }else{
                        if(!(temperature1<gdata.temperature) || (temperature1>25.0)){
                              temperature1=gdata.temperature
                              count++
                              alert++
                        }
                    }
                }
                messagetime=1;
                 
                if(count==5){
    
                        emailContent = `your air conditioner ON ${acnumber} sensor But your air conditioner is not giving the cooling  ${temperature1}`
                        const query={"devicesarray":data.deviceid}
                        const projection = { "email": 1, "_id": 0 };
                        const result = await devicelist.find(query, projection);
                        // const result = await cursor.toArray();
                
                        if (result && result.length > 0) {
                            const firstEmail = result[0].email;
                             message( firstEmail, emailContent)
                        }
                }

            }
        } else {
            timecalc = 0;
            messagetime = 0;
            watertime1 = 0;
            console.log("Ac is off")
        }
    } catch (error) {
        console.error('Error retrieving and sending data:', error);
    }
}
async function message(userEmail, emailContent) {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL, // Replace with your email address
            pass: process.env.MAIL_PASSWORD   // Replace with your email password or app password
        },
        tls: {rejectUnauthorized: false}
    });
    sendEmail(userEmail, 'Ac monitoring in water and air conditioner cooling', emailContent, transporter);
}

async function sendEmail(recipientEmail, subject, content, transporter) {
    console.log("enter")
    const mailOptions = {
        from: process.env.EMAIL, // Replace with your sender email address
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
