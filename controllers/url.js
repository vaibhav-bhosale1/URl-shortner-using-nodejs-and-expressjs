const shortid=require("shortid");
const URL=require('../modules/url');
async function generateshorturl(req,res){ 
const body=req.body;
if(!body.url){
    return res.status(400).json({error:"url is required"});
}
const shortID=shortid();
   
    await URL.create({
        shortId:shortID,
        redirectURL: body.url,
        visitedHistory: [],
    });
    return res.json({id:shortID});

}
module.exports={
    generateshorturl,
};