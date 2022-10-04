const express = require('express');
const ExpressError = require("./expressError")
const {loginTest} = require("./middleware/auth")

const app = express();

const userRoutes= require("./routes/user")


//Router routes
app.use("/users", userRoutes)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const dogs =[
    {name:"Lucky", age: 15},
    {name: "Kaia", age:7}
]

app.get('/dogs',loginTest, (req,res,next) =>{
    try{
    res.send("LIST OF DOGS o yea")
    } catch(e){
        next(e)
    }
})

//query prac
app.get("/search", (req,res,next) =>{
   try{
    if(req.query.location !== "osaka"){
        throw new ExpressError("WRONG PASS", 403)
    }
        const {location, breed} = req.query;
    res.send(`location: ${location} breed : ${breed}`)
} catch(e){
    next(e)
}
})

//header prac
app.get("/headers", (req,res)=>{
    const lang = req.headers['accept-language']
    res.send(`Youre language preference is ${lang}`)
})

//body prac
app.post("/register", (req,res) =>{
    res.send(`Welcome ${req.body.username}`);
})

//responding with json
app.get("/alldogs", (req,res)=>{
    res.json(dogs);
})

//make new dog
app.post("/alldogs", (req,res) =>{
    dogs.push(req.body);
    //configure status code returned
    res.status(201).json(dogs)
})

//generic error handler, not classified as error handler. hits only if no matches before this.
app.use((req,res,next) =>{
    const e = new ExpressError("Page not Found", 404)
    next(e);
})


//error handler has 4 parameters
app.use((error,req,res,next) =>{
    let status = error.status || 500;
    let message = error.message;

    return res.status(status).json({
        error: {message, status}
    });
});




module.exports = app;
