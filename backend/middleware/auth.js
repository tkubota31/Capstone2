function loginTest(req,res,next){
    console.log("is this working");
    return next();
}

module.exports = {loginTest}
