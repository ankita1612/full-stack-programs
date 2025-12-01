require("dotenv").config()
const express= require("express")
const cors= require("cors")
const helmet = require("helmet")
const {connection} = require("./src/config/db_connect")
const authRoute = require("./src/route/auth.route")
const propertyRoute = require("./src/route/UserProperty.route")
const app= express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(helmet())


app.use("/auth",authRoute)
app.use("/property",propertyRoute)

app.use((req, res, next) => {
    return res.status(404).json({success:false, message :"Page not found", data :[]} )
})

app.use((err, req, res, next) => {
    return res.status(500).json({success:false, message :err.message , slack: err.stack, data :[]} )    
})

connection().then(()=>{
    app.listen((process.env.PORT||4000),()=>{
        console.log("connection done")
    })
})
