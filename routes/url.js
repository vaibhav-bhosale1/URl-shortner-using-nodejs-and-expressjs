const express=require('express');
const router=express.Router();
const {generateshorturl}=require("../controllers/url");


router.post('/',generateshorturl);
module.exports=router;