const express = require("express");

const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


//const dbstore = require("./Model/sensorvalue");
const url = process.env.URL;
const port = process.env.PORT;

mongoose.connect(url, { useNewUrlParser: true });
const cons = mongoose.connection;
cons.on('open', () => {
    console.log("Connected to MongoDB...");
});
app.use(bodyParser.json());
//app.use(express.json());
app.use("/api/sensordata",require("./Router/sensorroutes"))
app.use("/api/users",require("./Router/userrouter"))




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
