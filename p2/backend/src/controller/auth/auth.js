import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../../models/user.js"
import { validationResult }  from "express-validator";

export const register = async(req,res)=>{    
    try {
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
        return res.status(422).json({"success": false, error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(201).json({"success": true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ "success": false,error: 'Internal server error',stack:error.stack });
    }
}
export const login = async(req,res)=>{
     try {        
        // Check if the email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, 'secret');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error',stack:error.stack  });
    }
}

 