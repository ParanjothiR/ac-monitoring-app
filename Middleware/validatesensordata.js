//const validateToken = require("./validateToken");

require('dotenv').config();

const nodemailer = require('nodemailer');
const db = require("../Model/sensorvalue")
const dbstore1 = require("../Model/uservalues")
let timecalc = 0;
let messagetime = 0;
let watertime1 = 0;
let watertime2 = 0
let emailContent = ""
async function validatesensordata(data) {
 
 
    try {

      
        if (data.acState === 'AC ON') {
            let water = parseFloat(data.waterLevelPercentage)
            console.log(water)

            if (watertime1 == 0) {
                if (water >= 40.0 && water <= 50.0) {
                    watertime1 = 1
                    console.log("water")
                    emailContent = "your air conditioner tray water level is increase you servicing in your air conditioner"
                    const userdb = await dbstore1.findOne({deviceid:data.deviceid})
                    const userEmail = userdb.email
                    console.log(userEmail)
                    message(userEmail, emailContent)
                }
            }
            if (watertime2 == 0) {
                if (water > 50.0) {
                    watertime2 = 1
                    emailContent = "your air conditioner tray water level is increase you are suddenly checking and servicing in your air conditioner"
                    const userdb = await dbstore1.findOne({deviceid:data.deviceid})
                    const userEmail = userdb.email
                    console.log(userEmail)
                    message(userEmail, emailContent)
                }
            }

            timecalc += 2;
            console.log(timecalc)
            if (timecalc >= 10) {
                const sensorData = await db.find({
                    deviceid:data.deviceid
                })
                    .sort({ _id: -1 }) // Sort in descending order of timestamp
                    .limit(5);
                // Limit to the last three records
                console.log(sensorData)
                let count = 1;
                let acnumber = parseInt(data.acno);
                let temperature1 = parseFloat(data.temperature);
                console.log(temperature1)
                let alert = 0;
                for (const gdata of sensorData) {
                    //emailContent += `Timestamp: ${data.timestamp}, temperatureValue: ${data.temperature},Acstatus:${data.acState},Acno:${data.acno}\n`;

                    if (temperature1 > 30.0 && gdata.temperature>30.0) {
                        alert = 1;
                        count++;
                        console.log(count)
                    }
                }
                console.log(alert)
                console.log(count)
                if (alert == 1 && count == 4) {
                    messagetime += 2;
                    // Create a Nodemailer transporter
                    if (messagetime === 2) {
                        
                        emailContent = `your air conditioner On ${acnumber} sensor/But your air conditioner is not giving the cooling  ${temperature}`
                        const userdb = await dbstore1.findOne({deviceid:data.deviceid})
                        const userEmail = userdb.email
                        console.log(userEmail)
                        message(userEmail, emailContent)
                        alert = 0;
                        // // Call the sendEmail function and pass the transporter as an argument

                    } else if (messagetime === 180) {
                        messagetime = 0;
                    }
                }

            }
        } else {
            timecalc = 0;
            messagetime = 0;
            watertime1 = 0;
            watertime2 = 0
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
        secure: true,
        auth: {
            user: process.env.Email, // Replace with your email address
            pass: process.env.MAIL_PASSWORD   // Replace with your email password or app password
        }
    });
    sendEmail(userEmail, 'Ac monitoring in water and air conditioner cooling', emailContent, transporter);
}

async function sendEmail(recipientEmail, subject, content, transporter) {
    console.log("enter")
    const mailOptions = {
        from: process.env.Email, // Replace with your sender email address
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
