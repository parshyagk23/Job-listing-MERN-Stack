require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./Routes/auth");
const JobRoute = require("./Routes/Job");
const app = express();

app.use(express.json());

const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_URL;

app.get("/", (req, res) => {
    res.json({ message: "Home" });
});
app.get("/api/health", (req, res) => {
    res.json({
        message: "Health",
        status: "Active",
        time: new Date(),
    });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/job", JobRoute);

app.use('*',(req,res)=>{
    
    res.status(404).json({errormessage:'Route not found!'})
})
app.use((error,req,res,next )=>{
    console.log(error)
    res.status(500).json({errormessage:'Something went wrong!'})
})

app.listen(port, () => {
    try {
        mongoose.connect(mongoDbUrl);
        console.log(`server is up at ${port} and DB Connected`);
    } catch (error) {
        console.log(error);
    }
});
