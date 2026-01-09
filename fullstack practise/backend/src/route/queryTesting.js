const express =require("express")
const router = express.Router()
const {listQuery, selectQuery} = require("../controller/queryTesting")


router.get("/list-query",listQuery)
router.get("/select-Query/:choice",selectQuery)

module.exports = router