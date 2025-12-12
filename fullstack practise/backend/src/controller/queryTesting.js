const Emp = require("../models/employee")
const User = require("../models/user")


module.exports.listQuery= async (req,res,next) =>{
    try{
        let data3 = await User.find().select("name password")
        let data=await Emp.find({status:"active"}).select("name email").limit(2).lean();
        let data1=await Emp.find({status:"active"}).select("name email").limit(2);
        let data4=await Emp.aggregate([
  { $group: { _id: "$salary" } },
  { $sort: { _id: -1 } },
  { $skip: 1 },
  { $limit: 1 }
]);

        return  res.json({success: true,data4,data3,data,data1});
    }
    catch(e)
    {
        next(e)
    }   
}
