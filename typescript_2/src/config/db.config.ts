import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

  //details from the env

const DB_URI = process.env.DB_NAME;

if (!DB_URI) {
  throw new Error("DB_NAME is not defined in environment variables");
}
//db connection
export const db = mongoose.connect(DB_URI)
.then(res => {
    if(res){
        console.log(`Database connection succeffully`)
    }
    
}).catch(err => {
    console.log(err)
})