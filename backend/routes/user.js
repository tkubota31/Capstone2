const express = require("express")
const router = express.Router()


const USERS = [{username: "uncunch"}]

router.get("/", (req,res) =>{
    res.json({users: USERS})
})

module.exports = router;
