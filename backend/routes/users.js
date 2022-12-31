const express = require("express")
const router = new express.Router()
const {ensureLoggedIn,ensureCorrectUser} = require("../middleware/auth")
const User= require("../models/users");
const jsonschema = require("jsonschema");
const newUserSchema = require("../schemas/newUser.json");
const {BCRYPT_WORK_FACTOR, SECRET_KEY} = require("../config")
const jwt = require("jsonwebtoken")

//create a new user
router.post("/register", async (req,res,next) =>{
    try{
        const {username} = req.body;
        const validator = jsonschema.validate(req.body, newUserSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e=>e.stack);
            return next(errs)
        }
        const user = await User.register(req.body);
        const token = jwt.sign({username}, SECRET_KEY)
        console.log(token)
        return res.status(201).json({user, token})
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
router.get("/:username/delete", async (req,res,next) =>{
    try{
        let username = req.params.username;
        await User.deleteUser(username);
        return res.json({deleted: username})
    } catch(e){
        next(e);
    }
})

module.exports = router;
