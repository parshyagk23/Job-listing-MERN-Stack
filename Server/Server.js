require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const authRoute = require("./Routes/auth");
const JobRoute = require("./Routes/Job");
const AppiedJobRoute = require("./Routes/AppliedJob")
const app = express();

app.use(express.json());
app.use(cors())

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
app.use("/api/v1/applied", AppiedJobRoute);

app.use('*',(req,res)=>{
    res.status(404).json({errormessage:'Route not found!'})
})
app.use((error,req,res,next )=>{
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
