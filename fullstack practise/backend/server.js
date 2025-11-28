//400 — Bad Request (Client mistake)
//500 — Internal Server Error (Your backend issue)
//201 — Created (Success for new resource)
require('dotenv').config();
const express =require("express")
const helmet =require("helmet")
const cors =require("cors")
const mongoose =require("mongoose")

const app= express()
app.use(express.json());
app.use(cors())
app.use(helmet())
const authRoute =require("./src/route/auth")
const empRoute = require("./src/route/employee")


const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection done")
    }
    catch(e)
    {
        req.status(500).send({"success":0,"message": e.error} )
        process.exit(1)
    }
}

connectDB()

app.use("/auth",authRoute)
app.use("/employee",empRoute)

app.use((err, req, res, next) => {
    res.status(500).json({'sucess':false,'error':err.message || "Internal Server Error",'stack' :err.stack});
});
app.listen(process.env.PORT,()=>{
    console.log("working fine" +process.env.PORT)
})
