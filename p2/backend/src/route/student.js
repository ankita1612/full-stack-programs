import express from'express';
const router = express.Router();
import {body, validationResult} from 'express-validator';
import multer from 'multer';
import {saveStudent, listStudent, updateStudent, deleteStudent,insertMany , insertNested, updateNested, updateOnlySkill, updateOnlyEducation, addUpdateSkillEducation} from '../controller/student/student.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ "-" + file.originalname );
  },
});

const upload = multer({ storage: storage })
               .fields([{ name: 'optional_image', maxCount: 1 }, 
                        { name: 'mandatory_image',maxCount: 1 },
                        { name: 'multi_image',maxCount: 10 }
                      ]);
const addVali=[
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),  
  body("age").notEmpty().withMessage("age is required"),
  body("skills").exists().withMessage("skill is required")]

  router.post('/', upload,addVali,saveStudent);
router.get('/', listStudent);
router.put('/:id',upload,addVali,updateStudent);
router.delete('/:id', deleteStudent);
router.post('/insert-many', insertMany);
router.post('/insert-nested', insertNested);
router.put('/update-nested/:id', updateNested);
router.put('/updateOnlySkill/:id',updateOnlySkill)
router.put('/updateOnlyEducation/:id',updateOnlyEducation)
router.put('/addUpdateSkillEducation/:id',addUpdateSkillEducation)
export default router;