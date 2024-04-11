const express=require('express');
const mongoose=require('mongoose');
const {connecttomongodb}=require("./connect");
const urlRoute=require('./routes/url');
const app=express();

connecttomongodb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongodb connected"));
const port =8001;


app.use(express.json());
app.use("/url",urlRoute);



app.listen(port,()=>console.log("server started"));

