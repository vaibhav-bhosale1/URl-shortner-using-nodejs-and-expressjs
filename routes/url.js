const express=require('express');
const router=express.Router();
const {generateshorturl,getanalytics}=require("../controllers/url");


router.post('/',generateshorturl);
router.get('/url/:shortId',getanalytics);

module.exports=router;