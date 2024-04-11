const express=require('express');
const mongoose=require('mongoose');
const {connecttomongodb}=require("./connect");
const urlRoute=require('./routes/url');
const URL=require('./modules/url');
const app=express();

connecttomongodb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongodb connected"));
const port =8001;


app.use(express.json());
app.use("/url",urlRoute);
app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
   const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
      visitHistory:{
        timestamp:Date.now(),
      }
    },

    });
res.redirect(entry.redirectURL);
});


app.listen(port,()=>console.log("server started"));

