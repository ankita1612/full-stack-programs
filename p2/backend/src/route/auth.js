import express from 'express'
const routes = express.Router()
import {register, login } from "../controller/auth/auth.js"
import {registrationRules, validateRequests, loginRules} from 
   '../validator/registration.js'

routes.post('/register', registrationRules(),validateRequests, register)
routes.post('/login', loginRules(),validateRequests, login)

export default routes