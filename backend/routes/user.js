const express = require("express")
const router = new express.Router()


let USERS ={
    "unch": "shiko",
    "Luckly": "Kaia"
}
router.get("/", (req,res,next) =>{
    res.json({users: USERS})
})

module.exports = router;
