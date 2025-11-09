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

// Middlewares
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limit (basic)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

// Static uploads (if using local storage)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/employee', empRoutes);
app.use('/property', propertyRoutes);


// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 + error
app.use(notFound);
app.use(errorHandler);

module.exports = app;
