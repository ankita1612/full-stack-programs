const express =require("express")
const router = express.Router()
const {listQuery} = require("../controller/queryTesting")


router.get("/list-query",listQuery)

module.exports = router