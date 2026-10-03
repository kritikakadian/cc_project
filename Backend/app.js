const express = require('express');
const app = express(); 
app.use(express.json());


const todoroutes = require("./src/routes/todoroutes");
const cors = require("cors");
const authroutes = require("./src/routes/authroutes");
const allowedOrigin =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
    origin: allowedOrigin,
}));
app.use("/api/auth", authroutes);
app.use("/api", todoroutes);
app.get("/", (req,res)=>{
    res.send("Backend Running");
})
module.exports = app;






