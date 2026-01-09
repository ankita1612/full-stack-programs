import express from 'express';
import dotenv from 'dotenv'
import connectDB from "./src/config/db.js";
import routes from './src/controller/user.js';
import auth from './src/controller/auth.js';
dotenv.config()
const app = express();
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth', auth);
app.use('/user', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});