import Employee from '../../models/employee.js'
import Department from '../../models/department.js'

import mongoose from "mongoose";
export const saveEmp = async(req,res) =>{
    const result = await Employee.create({
        name:req.body.name,
        email:req.body.email,
        department: req.body.department        
    })
    //const data =await Employee.find().populate("department")
//     const data =await Employee.find().populate({
//     path: 'department',
//     match: { status: "Active" },    
//     select: 'name -_id'
//   }).
    res.json(result)
}
export const listEmp = async(req,res)=>{
      const data =await Employee.find().populate({
            path: "department",
            match: { satus: {$ne:"Active"} },    
        })
        const filtered = data.filter(emp => emp.department !== null);
    res.json(filtered)
}
export const updateEmp=''
export const deleteEmp=''

