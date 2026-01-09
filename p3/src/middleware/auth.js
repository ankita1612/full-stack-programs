import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
   const token = req.headers['authorization'];
   if (!token) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   const token1 = token.split(' ')[1];

   jwt.verify(token1, process.env.SECRET_KEY, (err, decoded) => {
     if (err) {
       return res.status(401).json({ error: 'Unauthorized' });
     }
     req.user = decoded;
     next();
   });
};
const verifyToken1 = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  // Expect: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Invalid token format" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};
export default verifyToken