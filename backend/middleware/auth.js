const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError")

function authenticateJWT(req,res,next){
    try{
    const token = req.body._token;
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    return next();
    } catch(e){
        return next()
    }
}

function ensureLoggedIn(req,res,next){
    if(!req.user){
        const e = new ExpressError("Unauthorized", 401)
        return next(e)
    }else{
        return next();
    }
}

function ensureCorrectUser(req,res,next){
    try{
        const user = res.locals.user;
        if(!(user && user.username === req.params.username)){
            throw new ExpressError("Unauthorized User", 404)
        }
        return next()
    }catch(e){
        return next(e)
    }
}
module.exports = {authenticateJWT,
                  ensureLoggedIn}
