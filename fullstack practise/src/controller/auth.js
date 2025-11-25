const express =require("express")
const user =require("../models/user")
const { body, validationResult } = require('express-validator');
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")


module.exports.registration = async(req,res,next)=>{
    try{
        const data = req.body;
        const result = validationResult(req);
         if (!result.isEmpty()) {        
            return res.status(400).json({'success':false,'errors':result.array() })
        }                
        
        user_data=await user.findOne({"email":data.email});

        if(user_data){
            return res.status(400).json({'success':false,'errors':"User already exist" })
        }
        
        const new_password=await bcrypt.hash(data.password, 10);
        let created_data =await user.create(
            {
                name:data.name,
                email: data.email,
                password: new_password,
                my_date : new Date()
            } )
        created_data=created_data.toObject()
        delete created_data.password
        res.status(200).json({"success": true,"message":"User register successfully","data":created_data})
    }
    catch(e){
        next(e);
    }
}

module.exports.login =  async(req,res,next) =>{    
    try{
        const data = req.body;
        const errors = validationResult(req);
         if (!errors.isEmpty()) {       
            const formatted = errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })); 
            return res.status(400).json({'success':false,'errors': formatted })
        }
        let user_data =await user.findOne({"email":data.email})
        if(!user_data){
             return res.status(400).json({'success':false,'errors':"invalid email" })
        }
        const result =  await bcrypt.compare( data.password, user_data.password )
              
        if(!result){
            return res.status(400).json({'success':false,'errors':"Invalid password","data":{} })
        }        
        const jwt_key =jwt.sign({"id":user_data._id},process.env.SECRET_KEY,{ expiresIn: "1h" } );
        user_data= user_data.toObject()
        user_data.token=jwt_key
        user_data.name="My name :"+user_data.name         
        delete user_data.password
        return res.status(201).json({'success':true,'errors':"Success","data":user_data})
    }
    catch(e){
        next(e)
    }
}

