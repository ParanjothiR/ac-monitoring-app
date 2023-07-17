const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const dbstore = require("./Model/sensorvalue");

const url = process.env.URL;
const port = process.env.PORT;

mongoose.connect(url, { useNewUrlParser: true });
const cons = mongoose.connection;
cons.on('open', () => {
    console.log("Connected to MongoDB...");
});

app.use(express.json());
app.post('/api/sensordata', async (req, res) => {
    const { temperature, waterLevelPercentage, acState, acno, deviceid } = req.body;
    if (deviceid === "#1A6B9C") {
        console.log(req.body);
        try {
            const newSensorData = new dbstore({
                temperature,
                waterLevelPercentage,
                acState,
                acno,
                deviceid
            });
            const dataToSave = await newSensorData.save();
            console.log("success");
        } catch (error) {
            console.error(error);
        }
    }

    res.status(200).json({ message: "get the post successfully" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
