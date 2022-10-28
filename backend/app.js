const express = require('express');
const ExpressError = require("./expressError")
const app = express();
const {authenticateJWT} = require("./middleware/auth")
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticateJWT)

//Router routes
const petRoutes = require("./routes/pets")
const userRoutes= require("./routes/users")
const authRoutes = require("./routes/auth")

app.use("/users", userRoutes)
app.use("/pets", petRoutes)
app.use("/auth", authRoutes)




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
