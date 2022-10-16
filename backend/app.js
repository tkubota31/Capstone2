const express = require('express');
const ExpressError = require("./expressError")
const app = express();
const {authenticateJWT} = require("./middleware/auth")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticateJWT)

const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6IjcwM2VjODY5ZGRlOWM4Nzk1MGU2NDNjODMzNDQ5ZjExZjIzMThkYjcxMmI3NzlmZDE2NTRhNzUxYTJhZTVlNDc1NDRmNmNlMzhjNmQyZWRmIiwiaWF0IjoxNjY1NDM1NDU0LCJuYmYiOjE2NjU0MzU0NTQsImV4cCI6MTY2NTQzOTA1NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.AMmKtxYBea_o5ow7txo8jm4dL2zqQyT9Yyn3b27IeDG33dwa-LtlaeFtXmNh7vmyM3XXziBBA-pj3KdXFZIR7uMNbSjWuGpcfI3vLCdGBDt-F7vVmapl8c54iL50G87-B9V4ZYnD_8COF4NQZWfBiOYGjTT9XOR_69Y6Iyd6d81X7wSUmQCZXwQZsCHP_eYrZYAR1cGwvdYMUDi3ZqqC2YdYtDD04muK9usTSNTxKEqbtKmECX1AHhyY2y2DAcUj0lndFDvoR3r30x1I_y2tNt7TbcyYmquoYjf3LzZTwJx34d-zOsm3lcBj8_6XRylcnSc73568vQUMXW9oYeFnnA"
//Router routes
const petRoutes = require("./routes/pets")
const userRoutes= require("./routes/user")
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
