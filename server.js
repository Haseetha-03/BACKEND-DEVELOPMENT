const express = require('express')
const app=express();
const FirstRoute=require("./src/Routes/FirstRoutes")
app.use("/",FirstRoute);
app.listen(6000,()=>{
    console.log("Server start at port 6000");
})