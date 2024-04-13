const {getuser}=require("../service/auth");
function checkforauthentication(req,res,next){
    const tokencookie=req.cookies?.token;
    req.user=null;
    if(!tokencookie){
        return next();
    }
    const token=tokencookie;
    const user=getuser(token);
    req.user=user;
    next();
}

function restrictonly(roles=[]){
    return function(req,res,next){
        if(!req.user){
            return res.redirect("./login");
        }
        if(!roles.includes(req.user.role)){
            return res.render("unauthorized")
        }
        return next();
    }
}


module.exports={
 checkforauthentication,restrictonly,
}