const emp = require("../models/employee")
const { validationResult } = require('express-validator');

module.exports.employeeList= async (req,res,next) =>{
    try{
         const id =req.params.id;
         console.log(req.query.search)
         const {search, sort} = req.query
         let emp_data;
         if(id)
         {
            emp_data = await emp.findById(id);          
            emp_data = emp_data.toObject();
            emp_data.extra="this is deleted user"
         }
         else
         {
          let condiion_arr=[]
            if(id)
              condiion_arr.push({"_id":id}) 
            else if(search)
              condiion_arr.push({"name":search}) 
            
            let query = condition_arr.length > 0 ? { $and: condition_arr } : {};
            emp_data =await emp.find(query) 
         }
         

          res.json({success1: true,"data":{search,sort}}) 
         
        res.json({success2: true,"data":emp_data})
    }
    catch(e)
    {
        next(e)
    }   
}

module.exports.employeeAdd = async(req,res,next) =>{
    try{
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return  res.status(400).json({"success":false,"message":errors.array(),"data":[]})
      }
      const data = req.body
      let emp_data =await emp.findOne({"email":data.email})
      if(emp_data)
      {        
        res.status(400).json({"success":false,"message":"already exist","data":[]})
      }

      emp_data = await emp.create({
        "name":data.name,
        "salary":  data.salary,
        "email":  data.email,
        "status":  data.status,
        "desc":(data.desc??'')
       })
      emp_data = emp_data.toObject()
     res.status(400).json({"success":false,"message":"OK","data":{res:emp_data}})
    }
    catch(e)
    {
        next(e)
    }
}
 