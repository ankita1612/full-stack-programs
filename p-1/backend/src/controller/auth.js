const { StatusCodes } = require("http-status-codes");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
   //res.status(200).send({ message: "User created Successfully","successs":true});
  const { firstName, lastName, email, password } = req.body;
  try {
      const hash_password = await bcrypt.hash(password, 10);
      
      const userData = {
         firstName,
         lastName,
         email,
         hash_password,
      };

      const user = await User.findOne({ email });
      if (user) {
         return res.status(200).json({message: "User already registered","successs":false});
      } else {
         const data= await User.create(userData);
         res.status(200).json({ message: "User created Successfully",data:data,"successs":true });
      }
   } 
   catch (error) 
   {
      console.error(error);
      res.status(500).json({ message: "something went wrong",data:[],"successs":false });
   }   
};
const signIn = async (req, res) => {
   try {     
      
     const user = await User.findOne({ email: req.body.email });    
     
     if (user) {
         if (await bcrypt.compare(req.body.password, user.hash_password)) {
               const token = jwt.sign({ _id: user._id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "30d"});
               const { _id, firstName, lastName, email, role, fullName } = user;
               res.status(200).json({"successs":true,"message": '' ,user: {token, _id, firstName, lastName, email, role, fullName },
               });
         } else {
            res.status(200).json({message: "Wrong password!","successs":false });
         }
      } else {
         res.status(200).json({message: "User does not exist..!","successs":false });
      }
   } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message :error,"successs":false  });
   }
};
module.exports = { signUp, signIn};