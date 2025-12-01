 const user_property = require("../model/UserProperty")
const {  validationResult } = require('express-validator');

module.exports.listProperty = async(req,res,next) =>{ 
    try{
          const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const total = await user_property.countDocuments();

    const products = await user_property.find().skip(startIndex).limit(limit);

    res.json({
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        data: products
    });
    }   
    catch(e) 
    {
        next(e)
    }
    res.send("ok list") 


}
module.exports.addUserProperty = async(req,res,next) =>{   
   const result = validationResult(req);
   const data = req.body
   try{
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
        }
        const created_data=await user_property.create({
            name:data.name,
            detail:data.detail,
            type:data.type,
            size:data.size,
            owner:data.owner,
            amenities:data.amenities,
            address:data.address
        })
        return  res.status(200).json({success:true, data:created_data, message : "success fully added"} )

   }
    catch(e){
        next(e)
    }  

  
    res.send("ok add") 
}

module.exports.deleteUserProperty = (req,res,next) =>{ res.send("ok delete") }
module.exports.putUserProperty = (req,res,next) =>{ res.send("ok put") }
module.exports.patchUserProperty = (req,res,next) =>{ res.send("ok patch") }