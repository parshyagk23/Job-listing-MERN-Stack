require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./Routes/auth");
const app = express();

app.use(express.json());

const port = process.env.PORT;
const mongoDbURl = process.env.MONGODBURL;

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

app.listen(port, () => {
    try {
        mongoose.connect(mongoDbURl);
        console.log(`server is up at ${port} and DB Connected `);
    } catch (error) {
        console.log(error);
    }
});
