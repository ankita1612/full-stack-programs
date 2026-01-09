import Student from '../../models/student.js';
import Dummy from '../../models/dummy.js';
import mongoose from "mongoose";

import {check, validationResult} from 'express-validator';
export const saveStudent= async (req, res) => {
     
   //return res.json({req:req.body})
    try{    
        const result = validationResult(req);
        if (result.isEmpty()) {
             
            if(!req.files.mandatory_image)
            {
                res.status(422).json({success: false,message : "Mandatory image is required"})
            }
            if(req.files.multi_image.length==0)
            {
                res.status(422).json({success: false,message : "Atleast one image is required"})
            }
            const optional_image= (req.files?.optional_image[0]?.filename? req.files.optional_image[0].filename:'')
            const mandatory_image = (req.files?.mandatory_image[0]?.filename? req.files.mandatory_image[0].filename:'')
            const multi_image = (req.files?.multi_image ? req.files.multi_image:'')
            const arr_multi= multi_image.map((i)=>{return i.filename})
            const { name, email, age, skills } = req.body;
            try {               
                const data=await Student.create(
                    {
                     "name": name,
                     "email": email,
                     "age": age,
                     "mandatory_image":mandatory_image,
                     "optional_image": optional_image,
                     "multi_image" : arr_multi,
                     "skills" : skills,
                     "educations" :[{name:"GSEBB",collage:"test",year:1990}]
                    })
                res.json({success:true,data:data,"message":"success"});
            } catch (error) {
                console.error(error);
                res.status(500).json({success:false,data:error});
            }
        }
        else
        {
            res.status(422).json({success: false,message : "validaion error", errors: result.array() });
        }
    }
    catch(e){
        res.status(500).json({success: false,message : "internal server error", errors: e.stack });
    }    
}
// Create a new student
// export const saveStudent= async (req, res) => {
     
   
//     try{    
//         const result = validationResult(req);
//         if (result.isEmpty()) {
             
//             if(!req.files.mandatory_image)
//             {
//                 res.status(422).json({success: false,message : "Mandatory image is required"})
//             }
//             if(req.files.multi_image.length==0)
//             {
//                 res.status(422).json({success: false,message : "Atleast one image is required"})
//             }
//             const optional_image= (req.files?.optional_image[0]?.filename? req.files.optional_image[0].filename:'')
//             const mandatory_image = (req.files?.mandatory_image[0]?.filename? req.files.mandatory_image[0].filename:'')
//             const multi_image = (req.files?.multi_image ? req.files.multi_image:'')
//             const arr_multi= multi_image.map((i)=>{return i.filename})
//             const { name, email, age } = req.body;
//             try {               
//                 const data=await Student.create(
//                     {
//                      "name": name,
//                      "email": email,
//                      "age": age,
//                      "mandatory_image":mandatory_image,
//                      "optional_image": optional_image,
//                      "multi_image" : arr_multi
//                     })
//                 res.json({success:true,data:data,"message":"success"});
//             } catch (error) {
//                 console.error(error);
//                 res.status(500).json({success:false,data:error});
//             }
//         }
//         else
//         {
//             res.status(422).json({success: false,message : "validaion error", errors: result.array() });
//         }
//     }
//     catch(e){
//         res.status(500).json({success: false,message : "internal server error", errors: e.stack });
//     }    
// }

export const listStudent = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({success:true,data:students});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,data:error});
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, age, skills } = req.body;
   
  try {
   
    let data= { name : name, 
          email : email,
          age: age,
          skills :skills
    }
    res.json(data)
    if(req.files?.optional_image?.[0]?.filename)
    {
        data.optional_image=req.files.optional_image[0].filename
    }
     if(req.files?.mandatory_image?.[0]?.filename)
     {
         data.mandatory_image=req.files.mandatory_image[0].filename
     }
    if(req.files?.multi_image?.length>0){
        const arr_multi= req.files.multi_image.map((i)=>{return i.filename})
        data.multi_image =arr_multi
    }    

    

    const student = await Student.findByIdAndUpdate(id, 
        data, 
        { new: true });
    res.json({success:true,data:student});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,data:error.stack});
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    res.json({success:true,data:student});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,data:error});
  }
}
// {  "dummy": [
//     { "name": "ankita", "age": 40 },
//     { "name": "jenil", "age": 35 },
//     { "name": "maulik", "age": 30 }
// ]}
export const insertMany= async(req,res) =>{
    try{     
        // const new_data = await Dummy.insertMany(req.body.dummy)
        // res.json({success:true,data:new_data});

        const new_data = await Dummy.create({
                name:req.body.name,
                child_data:req.body.dummy
            }
        )
         res.json({success:true,data:new_data});
        
    }
    catch(e){
        res.send(e.stack)
    }

    
}
//where id(1,2,3) getch
//multiple insert
//

export const insertNested= async(req,res)=>{
  const data = req.body

  const created = await Student.create(
    {
      "name" : data.name,
      "email" : data.email,
      "age" : data.age,
      "skills" : data.skills,
      "educations" : data.educations
    }
  )
  res.json({"data":created})
}
export const updateNested=async(req,res)=>{
  try{
      const {id} =req.params
      const data= req.body
    const data_exist = await Student.findById(id);

    if(!data_exist){
      res.json({"data":"no record exist"})
    }
    
    const new_data = await Student.updateOne({_id:id},
        {
          $set:{
            "name" : data.name,
            "email" : data.email,
            "age" : data.age,
            "skills" : data.skills,
            "educations" : data.educations
          }
        }
      )
    res.json(new_data)  
    
  }  
  catch(e){
    res.json(e.stack)
  }
}

export const updateOnlyEducation=async(req,res)=>{
try{
    const {id} =req.params
    const data = req.body
    const exist = Student.findById(id)
    if(!exist)
    {
      res.json({error:"data not exist"})
    }
    else
    {
      const updated_data = await Student.findByIdAndUpdate(id, 
       { "educations.$[eid].name": data.educations.name , 
                  "educations.$[eid].collage": data.educations.collage , 
                  "educations.$[eid].year": data.educations.year ,
        },
        { arrayFilters: [ { "eid._id": data.educations._id }], new: true }
      )     
     res.send(updated_data)
       
    // const eduId = data.educations._id
    // const updated_data = await Student.findOneAndUpdate(
    //   {
    //     _id: id,
    //     "educations._id": eduId
    //   },
    //   {
    //     $set: {
    //       "educations.$.name": data.educations.name,
    //       "educations.$.collage":  data.educations.collage,
    //       "educations.$.year":  data.educations.year
    //     }
    //   },
    //   { new: true }
    // );
    // res.send(updated_data)

    }
 }  
 catch(e)
 {
    res.json(e.stack)
 } 
}
export const updateOnlySkill=async(req,res)=>{
try{
    const {id} =req.params
    const data = req.body
    const exist = Student.findById(id)
    if(!exist)
    {
      res.json({error:"data not exist"})
    }
    else
    {
      const updated_data = await Student.findByIdAndUpdate(id, 
          {"skills" : data.skills}
      );
     res.send(updated_data)
    }
 }  
 catch(e)
 {
    res.json(e.stack)
 } 
}
export const addUpdateSkillEducation=async(req,res)=>{
try{
    const {id} =req.params
    const data = req.body
    const exist = Student.findById(id)
    if(!exist)
    {
      res.json({error:"data not exist"})
    }

    const up_data =data.educations.filter((s)=> {
          return s._id!=undefined
    })
    for(let i=0; i<up_data.length;i++)
    {
        const updatedParent = await Student.findOneAndUpdate(
          { _id: id, 'educations._id':up_data[i]._id },
          { $set: { 
              "skills" :data.skills,
              "educations.$.name": up_data[i].name,
              "educations.$.collage": up_data[i].collage,
              "educations.$.year": up_data[i].year
           } },
        );
    }
    const new_data =data.educations.filter((s)=> {
          return s._id==undefined
    })

    for(let i=0; i<new_data.length;i++)
    {
        const updatedParent = await Student.findOneAndUpdate(
          { _id: id },
          { 
            $set:{"skills" :data.skills},
            $push: { 
              "educations": new_data[i]              
            }
          },
        );
    }
   res.send({up_data:up_data,new_data:new_data})
 }  
 catch(e)
 {
    res.json(e.stack)
 } 
}
