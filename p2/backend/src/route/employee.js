import express from'express';
const router = express.Router();
import {body, validationResult} from 'express-validator';
import multer from 'multer';
import {saveEmp, listEmp, updateEmp, deleteEmp} from '../controller/employee/employee.js'

router.post('/', saveEmp);
router.get('/', listEmp);
// router.put('/:id',updateEmp);
// router.delete('/:id', deleteEmp);

export default router;