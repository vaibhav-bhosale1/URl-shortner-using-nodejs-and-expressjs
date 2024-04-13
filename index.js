const express=require('express');
const mongoose=require('mongoose');
const {connecttomongodb}=require("./connect");
const path=require('path');
const urlRoute=require('./routes/url');
const URL=require('./modules/url');
const cookieparser=require('cookie-parser')
const {checkforauthentication,restrictonly}=require('./middleware/auth')
const staticrouter=require('./routes/staticrouter');
const userroute=require("./routes/user");


const app=express();

connecttomongodb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongodb connected"));
const port =8001;


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.get("/test",async (req,res)=>{
  const allUrls=await URL.find({});
  res.render("home",{
    urls:allUrls,
  });
})


//midleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforauthentication);

//routes
app.use("/url",restrictonly(["NORMAL"]),urlRoute);
app.use("/",staticrouter);
app.use("/user",userroute)

app.get('/:shortId',async (req,res)=>{
  const shortId=req.params.shortId;
  const entry=await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push:{
        visitHistory:{
          timestamp:Date.now(),
        }
      },
    }
  )
 res.redirect(entry.redirectURL);
})


app.listen(port,()=>console.log("server started"));

