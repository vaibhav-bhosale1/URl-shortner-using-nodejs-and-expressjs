const express=require('express');
const mongoose=require('mongoose');
const {connecttomongodb}=require("./connect");
const path=require('path');
const urlRoute=require('./routes/url');
const URL=require('./modules/url');
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

//routes
app.use("/url",urlRoute);
app.use("/",staticrouter);
app.use("/user",userroute)




app.listen(port,()=>console.log("server started"));

