require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validate_user, User } = require('./src/models/user');
const { body, validationResult } = require("express-validator");


const app = express();

// -----------------------------
// ENV VARIABLES
// -----------------------------
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// -----------------------------
// DB CONNECTION
// -----------------------------
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1); // Stop app if DB not connected
  }
};

connectDB();

// -----------------------------
// GLOBAL MIDDLEWARE
// -----------------------------
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------
// ROUTES
// -----------------------------
app.post('/register', async (req, res) => {
  try {
    const user_data = req.body;

    // Joi validation with all errors
    const { error } = validate_user(user_data, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ success: 0, errors });
    }

    // Check if user exists
    const user_exist = await User.findOne({ email: user_data.email });
    if (user_exist) {
      return res.status(400).json({
        success: 0,
        message: 'Email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(user_data.password, 10);

    // Create user
    const user = await User.create({
      name: user_data.name,
      email: user_data.email,
      password: hashedPassword,
      deleted_date: null, // match your model
    });

    // Remove password before sending
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      success: 1,
      message: 'User registered successfully',
      data: userObj,
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      success: 0,
      message: 'Server error',
      error: err.message,
    });
  }
});
const loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required").bail()
    .isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty().withMessage("Password is required")
];

app.post("/login", loginValidation, async (req, res) => {
  // Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: 0, errors: errors.array() });
  }
  return res.json("Done")  

});
// -----------------------------
// GLOBAL ERROR HANDLER
// -----------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: 0,
    message: 'Something broke!',
    stack: err.stack,
  });
});

// -----------------------------
// SERVER START
// -----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
