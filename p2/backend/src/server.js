import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js';
import authRoute from './route/auth.js'
import studentRoute from './route/student.js'
import employeeRoute from './route/employee.js'
import adminRoute from './route/admin.js'


dotenv.config()
 const PORT = process.env.PORT;
 const app = express()
app.use(express.json());

connectDB()
app.use('/auth', authRoute)
app.use('/student', studentRoute)
app.use('/employee', employeeRoute)
app.use('/admin', adminRoute)



process.on('unhandledRejection', ()=>{
    console.log("Some thing wrong 1")
})
process.on('uncaughtException', error => {
    console.log(error)
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})