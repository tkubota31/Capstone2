const express = require("express")
const router = new express.Router()
const {ensureLoggedIn} = require("../middleware/auth")
const User= require("../models/user");


//create a new user
router.post("/register", async (req,res,next) =>{
    try{
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

//delete user
router.get("/:username/delete", ensureLoggedIn, async (req,res,next) =>{
    try{
        let username = req.params.username;
        await User.deleteUser(username);
        return res.json({deleted: username})
    } catch(e){
        next(e);
    }
})

module.exports = router;
