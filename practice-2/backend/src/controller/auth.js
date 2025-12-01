
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../model/user")
module.exports.userLogin = async(req ,res, next) => {
    try{
        const data= req.body
        const result= validationResult(req);
        if (!result.isEmpty()) {      
            return  res.status(200).json({success:false, data:[],errors: result.array() });     
        }
        const user_data =await user.findOne({email:data.email})
        if(user_data)
        {
            const valid_password = await bcrypt.compare(data.password,user_data.password )
            if(valid_password){
                const token = await jwt.sign({id:user_data._id},process.env.SECRET_KEY,{ expiresIn: '1h' })
                return  res.status(200).json({success:true, data:{token:token}, message : "success login"} )
            }
            else{
                return  res.status(200).json({success:false, data:[], message : "password not match"} )
            }
        }
        else{
            return  res.status(200).json({success:false, data:[], message : "user not found"} )   
        }
    }
    catch(e){
        next(e)
    }    
}    
  
module.exports.userRegister = async(req , res, next) => {
     try{
        //return   res.status(200).send("Donw"); 
        const data= req.body
        const result= validationResult(req);
        if (!result.isEmpty()) {      
            return   res.status(200).json({success:false, data:[],errors: result.array() });     
        }
        else
        {
           const total_records = await user.countDocuments({email:data.email})           
           if(total_records)
           {
                return res.status(200).json({success:true, data:[],message:"Email already exist "} )
           }
           else
           {
                const password =await bcrypt.hash(data.password,10)
                const data_created=await user.create(
                    {
                    "name":data.name,
                    "email": data.email,
                    "password" :password,
                    "status" : data.status,
                    "joining_date" : new Date().toISOString().split('T')[0]
                    }
                )
                
                return res.status(200).json({success:true, data:data_created,message:"User create success"} )
                
           }
        }   
    }
    catch(e){
        next(e);
    }
}