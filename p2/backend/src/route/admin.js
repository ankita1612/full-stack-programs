import express from'express';
const router = express.Router();
import {addAdmins, listAdmins} from '../controller/admin.js'

router.post('/', addAdmins);
router.get('/', listAdmins);


export default router;