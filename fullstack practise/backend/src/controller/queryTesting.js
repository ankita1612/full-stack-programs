const Emp = require("../models/employee")
const User = require("../models/user")
module.exports.selectQuery= async (req,res,next) =>{    
    let data;    
    switch(req.params.choice)
    {
        case "find_salary_1000":            
            //data = await Emp.find({salary:{$gt:1000}},{name:1,salary:1})
            const data = await Emp.find({salary:12333})
                .select('fname lname')
                .lean({ virtuals: true });
            res.json({ data });    
            break;
        case "find_customise_lean":
            //http://localhost:3000/query-testing/select-Query/find_customise_lean
            data = await Emp.find().lean();
            data.forEach(d => {
                d.name = "MR." + d.name;
                d.new_field = Math.random();
            });
            res.json({ data });    
            break;
        case "find_customize_object":
            data = await Emp.find();
            const result = data.map(d => ({
                ...d.toObject(),
                name: "MR." + d.name,
                new_field: Math.random()
            }));
            res.json({ data: result });
        default :
            res.json({ data: "wrong choice" });
    }    
}

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
