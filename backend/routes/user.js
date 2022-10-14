const express = require("express")
const router = new express.Router()

const User= require("../models/user");


let USERS ={
    "unch": "shiko",
    "Luckly": "Kaia"
}

//create a new user
router.post("/", async (req,res,next) =>{
    try{
        console.log("START")
        console.log(req.body);
        const user = await User.register(req.body);
        console.log(user)
        return res.json({user})
    }catch(e){
        return next(e);
    }
})


//get specific user
router.get("/:username", async (req,res,next) =>{
    try{
        const user = await User.getUser(req.params.username);
        return res.json({user});
    } catch(e){
        return next(e);
    }
})

module.exports = router;
