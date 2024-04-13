const express=require('express');
const { restrictonly } = require('../middleware/auth');
const URL=require('../modules/url');
const router=express.Router();

router.get('/',restrictonly(["NORMAL"]),async (req,res)=>{
    const allurls=await URL.find({createdBY:req.user._id});
    res.render("home",{
        urls:allurls
    });
})
router.get('/signup',(req,res)=>{
    res.render("signup");
})
router.get('/login',(req,res)=>{
    res.render("login");
})


module.exports=router;