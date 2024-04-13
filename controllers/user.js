const User=require('../modules/users');
const {v4: uuidv4}=require('uuid');
const{setuser}=require('../service/auth');

async  function createusersignup(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });
   return res.render("/");

}
async  function createuserlogin(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error:"invalid username or password"
        });
    }
    
    const token=setuser(user);
    res.cookie("token",token);
    return res.redirect("/");

}

module.exports={
    createusersignup,
    createuserlogin,
};