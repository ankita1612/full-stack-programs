const express = require("express")
const router= express.Router()
const authMiddleware = require("../middleware/auth.moddleware")
const {listProperty, addUserProperty ,  deleteUserProperty, putUserProperty, patchUserProperty} = require("../controller/UserProperty")
const {body} = require("express-validator")
const validateUserProperty = [
    body("name").trim().notEmpty().withMessage("Please enter property name"),
    body('detail').notEmpty().trim().withMessage("Please enter property detail"),
    body('type').notEmpty().trim().toLowerCase().withMessage("Please enter property type").isIn("residential, commercial").withMessage("please select 2BHK,3BHK"),    
    body('size').toUpperCase().trim().isIn("2BHK","3BHK").withMessage("Please enter property size 2BHK 3BHK ").custom((value, { req }) => {
        if( req.body.type=="residential" && value ==='')
            return false;
        else
            return true;
    }),
    body('owner').notEmpty().trim().withMessage("Please enter property owner"),
    body('amenities').notEmpty().trim().withMessage("Please enter property amenities"),
    body('address').optional().trim()
]

router.get("/",listProperty)
router.get("/:id",listProperty)
router.post("/",authMiddleware,validateUserProperty, addUserProperty)
router.delete("/",deleteUserProperty)
router.put("/",putUserProperty)
router.patch("/",patchUserProperty)


module.exports = router