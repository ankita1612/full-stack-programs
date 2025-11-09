const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const sendWelcomeEmail = require('../utils/mailer');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

exports.register = async (req, res, next) => {
  
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(200).json({ success: false, message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hashed });

    // send welcome email (fire-and-forget)
    // try {
    //   await sendWelcomeEmail(user.email, user.name);
    // } catch (e) {
    //   console.warn('Failed to send welcome email', e);
    // }

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ success: true, data: userObj });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, deleted_at: null });
    if (!user) return res.status(200).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(200).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({ success: true, data: { token, user: userObj } });
  } catch (err) {
    next(err);
  }
};
