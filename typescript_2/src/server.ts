import express from 'express'
import { db} from './config/db.config'
import { router } from './routes/post.route'

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api/v1/posts', router)
console.log(process.env.PORT)
//db connection then server connection
db.then(() => {
    app.listen(process.env.PORT ||3000, () => console.log('Server is listening on port 5000'))
})
