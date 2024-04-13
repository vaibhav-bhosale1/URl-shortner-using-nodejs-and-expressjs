const express=require('express');
const router=express.Router();
const {createusersignup,createuserlogin}=require('../controllers/user')

router.post('/',createusersignup);
router.post('/login',createuserlogin);

module.exports=router;