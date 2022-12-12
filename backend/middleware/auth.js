const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError")

function authenticateJWT(req,res,next){
    try{
        // console.log(`req.url: ${req.url}`)
        // console.log(`req.originalUrl: ${req.originalUrl}`)
        // console.log(`data: ${JSON.stringify(req.data)}`);
        // console.log(`params: ${JSON.stringify(req.params)}`);
        // console.log(`query: ${JSON.stringify(req.query)}`);
        // console.log(`body: ${JSON.stringify(req.body)}`);
        const token = req.query._token;
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
        console.log(`req.user in authjwt: ${token}`)
        console.log(`trying to find current user ${payload}`)
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
                  ensureLoggedIn,
                ensureCorrectUser}
