const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  next();
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({  success:false,message: 'Token missing' });
  }

jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success:false, message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports.validateUser = validateUser;   
