const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
   shortId:{
    type:String,
    required:true,
   },
   redirectURL:{
    type:String,
    required:true,
    default:"home",
   },

visitHistory:[{timestamp:{type:Number}}],
},
{timestamps:true}
);

const URL=mongoose.model('url',urlSchema); 
module.exports=URL;