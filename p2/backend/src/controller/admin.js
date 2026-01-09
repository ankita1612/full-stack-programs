import Admin from "../models/admin.js";
import Hobby from "../models/hobby.js";

export const listAdmins = async (req, res) => {
  const admins = await Admin.find()
    .populate("hobby");   // 🔥 magic line

  res.json(admins);
};

export const addAdmins = async (req, res) => {
  
//   const hobby = await Hobby.create({
//   name: "Cricket",
//   category: "Sports"
// })
  const admins= await Admin.create({
  name: req.body.name,
  email: req.body.email,
  hobby: req.body.hobby
});

  res.json(admins);
};