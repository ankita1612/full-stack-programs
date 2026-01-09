import { Router } from "express";
import * as controller from "./employee.controller";
import { upload } from "../middlewares/upload.middleware";
import { createEmployeeValidation, idParamValidation} from "./employee.validation";

const router = Router();

router.post( "/",upload.single("profile_image"), createEmployeeValidation, controller.createEmployee);
router.get("/", controller.getEmployees);
router.get("/:id", idParamValidation, controller.getEmployeeById);
router.put("/:id", idParamValidation, controller.updateEmployee);
router.delete("/:id", idParamValidation, controller.deleteEmployee);

export default router;
