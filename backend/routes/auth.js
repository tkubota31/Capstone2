const express = require("express");
const router = new express.Router()
const ExpressError = require("../expressError")
const db = ("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR, SECRET_KEY} = require("../config")
const jwt = require("jsonwebtoken")
const {ensureLoggedIn} = require("../middleware/auth")

// router.post("/register", async (req,res,next) =>{
//     try{
//         const {username, password} = req.body;
//         if(!username || password){
//             throw new ExpressError("Username and password required", 400)
//         }
//         //hash password and save to db
//         const hashedPw= await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
//         const results = await db.query(`
//             INSERT INTO user (username, password)
//             VALUE ($1, $2)
//             RETURNING username`,
//         [username,hashedPw]);
//         return res.json(results.rows[0]);
//     }catch(e){
//         return next(e)
//     }
// })

// router.post("/login", async (req,res,next) =>{
//     try{
//         const {username, password} = req.body;
//         if(!username || !password){
//             throw new ExpressError("Username and password required", 400);
//         }
//         const results = await db.query(`
//             SELECT username, password
//             FROM users
//             WHERE username = $1`,
//             [username]);

//         const user = results.rows[0];
//         if(user){
//             //use bcrypt to check hashed pass and jwt to create token
//             if(await bcrypt.compare(password, user.password)){
//                 const token = jwt.sign({username}, SECRET_KEY)
//                 return res.json({message: "Logged In", token})
//             }
//         }
//         throw new ExpressError("Username not found", 400)
//     }catch(e){
//         return next(e);
//     }
// })

// router.get("/topsecret", ensureLoggedIn, async (req,res,next)=>{
//     try{
//         const token = req.body._token;
//         const data= jwt.verify(token, SECRET_KEY)
//         return res.json({msg: "Signed In"})
//     }catch(e){
//         return next(e)
//     }
// })

module.exports = router;
