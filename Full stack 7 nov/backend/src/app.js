const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const empRoutes = require('./routes/emp.routes');
const propertyRoutes = require('./routes/property.routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const app = express();

/* 🧩 --- Security & Utility Middlewares --- */
app.use(helmet());
app.use(cors({
  origin: '*', // ✅ change to ['http://localhost:5173', 'https://yourdomain.com'] in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* 🧩 --- Rate Limiter --- */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200
});
app.use(limiter);

/* 🧩 --- Static File Handling --- */
// Serve all uploads with proper CORS headers
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, '..', 'uploads')));

/* 🧩 --- Routes --- */
app.use('/auth', authRoutes);
app.use('/employee', empRoutes);
app.use('/property', propertyRoutes);

/* 🧩 --- Health Check --- */
app.get('/health', (req, res) => res.json({ status: 'ok' }));

/* 🧩 --- Error Handlers --- */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
