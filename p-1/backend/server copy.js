const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute=require("./src/routes/login")
const mongoose = require('mongoose');

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors())
app.use(helmet())

mongoose.connect('mongodb://localhost:27017/practise')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use("/auth",authRoute)
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);
