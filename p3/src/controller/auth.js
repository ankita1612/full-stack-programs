import express from 'express';
import User from "../model/user.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
const router = express.Router();

router.post('/register', async (req, res) => {
  
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    
    const data = await newUser.save();
    res.status(201).json({ message: 'User registered successfully',data:data });
  } catch (error) {
    res.status(500).json({ error: error.stack});
  }
});

// Route to authenticate and log in a user
router.post('/login', async (req, res) => {
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
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
});

export default router;