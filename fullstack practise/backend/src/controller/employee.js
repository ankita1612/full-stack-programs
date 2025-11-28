const emp = require("../models/employee")
const { validationResult } = require('express-validator');

module.exports.employeeList= async (req,res,next) =>{
    try{
         const id =req.params.id;
         console.log(req.query.search)
         const {search, status, sort, sortby, page = 1, limit = 10} = req.query
         let emp_data;
         if(id)
         {
            emp_data = await emp.findById(id);          
            emp_data = emp_data.toObject();
            emp_data.extra="this is deleted user"
            return  res.json({success: true,  data: emp_data});          
         }
         else
         {             
            let query = {};

            // Filter by status
            if (status) {
              query.status = status;
            }

            // Search by name OR email
            if (search) {
              query.$or = [
                { name:  { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
              ];
            }

            // Sorting Logic
            let sortObj = {};
            if (sortby && sort) {
              sortObj[sortby] = sort === "asc" ? 1 : -1;
            }

            // Pagination logic
            const pageNum  = parseInt(page);
            const limitNum = parseInt(limit);
            const skipVal  = (pageNum - 1) * limitNum;

            // Get total count
            const totalRecords = await emp.countDocuments(query);

            // Fetch paginated data
            //const emp_data = await emp.find(query).sort(sortObj).skip(skipVal).limit(limitNum);

            const queryBuilder = emp.find(query).sort(sortObj).skip(skipVal).limit(limitNum);
            console.log("Generated Query:", queryBuilder.getQuery());
            console.log("Sorting:", queryBuilder.getOptions());
            const emp_data = await queryBuilder;
            
          return  res.json({success: true, page: pageNum, limit: limitNum, totalRecords,totalPages: Math.ceil(totalRecords / limitNum), data: emp_data});          
         }
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
        return  res.status(200).json({"success":false,"message":errors.array(),"data":[]})
      }
      const data = req.body
      let emp_data =await emp.findOne({"email":data.email})
      if(emp_data)
      {        
        res.status(200).json({"success":false,"message":"email already exist","data":[]})
      }

      emp_data = await emp.create({
        "name":data.name,
        "salary":  data.salary,
        "email":  data.email,
        "status":  data.status,
        "desc":(data.desc??'')
       })
      emp_data = emp_data.toObject()
     res.status(200).json({"success":true,"message":"Employee added successfully","data":{res:emp_data}})
    }
    catch(e)
    {
        next(e)
    }
}
module.exports.employeeEdit = async(req,res,next) =>{
  try{
      const result = validationResult(req);
      const id= req.params.id
      const data = req.body
     // return res.send({ message:id,data:data});
      if (!result.isEmpty()) {
         return res.status(200).send({ success: false,message: result.array() });
      }
      let query = {};
      query = {"_id":{$ne:id},email:data.email}
       
      const is_email_exist = await emp.countDocuments(query)
      if(is_email_exist){
        return res.status(200).send({success: false, message:"data already exist"});
      }
      
      const resullt=await emp.findByIdAndUpdate(id,{$set:{
        "name" :data.name,
        "salary":data.salary,
        "email":data.email,
        "status":data.status,
        "desc":data.desc??""
      }})   

      return res.status(200).send({success: true, data:resullt,message:"Record updated"});
  }
  catch(e)
  {
    next(e)
  }
} 

module.exports.employeeDelete = async(req, res, next) =>{
  try{
    const id = req.params.id
    const emp_data=await emp.findById(id)
    
    if(emp_data)
    {
        await emp_data.deleteOne();
    }    
    return res.status(200).send({success: true, data:[],message:"Record deleted successfully"});
  }
  catch(e)
  {
    next(e)
  }

}