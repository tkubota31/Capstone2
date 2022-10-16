const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")
const {ensureLoggedIn} = require("../middleware/auth")

let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6IjE3YjAzMjEzODZlNDQxOGY1NmRkZTgyNTEzMmNiMjQ4ZTViMzYyZTM4OTgwZGQ5MTQyNWY5MzM5ZmYwMjU2NjM3NjI1YmM2M2RhMzhiOWM4IiwiaWF0IjoxNjY1OTQ4MDMzLCJuYmYiOjE2NjU5NDgwMzMsImV4cCI6MTY2NTk1MTYzMywic3ViIjoiIiwic2NvcGVzIjpbXX0.PYbdGG3WNPHm2rZtjtHgUEQxBPRedi5nhmePo3flTJQBrOGcRDv22X5VORmYfEf30L7QcTRSsHtR1u16hWOIHsPhqUyOzn2kyTiY-3Wvx1jGCkS3ZubTSxdBp2-HJaOrFCerbxuKYM5UhoSp4itp4bAnFtIXr_ALABpAIlLnX6Hv8oz-kEHGNqCtMHKb_jQzhqUnbeiVv_XujKT86Hw7YZkqsIIPIOATc4WWwg3c0R6DozB0FQMFHoCu1ZZdiXpZiwgz87i-nXW89fcfW5btczOy6i_fzgOAUlnjZBYDKGjx2hSubk5GwnGYYkRMsKHxshS1RJMzxtG8RLVuGg-sYw"
// axios.defaults.headers.common["Authorization"] = 'Bearer ' + accessToken **didn't work!
const apiURL = "https://api.petfinder.com/v2"
const config ={
    headers:{
        "Authorization": "Bearer " + accessToken
    }
}

// makes ensureLoggedIn method run for every route that has /pets
router.get("/*", ensureLoggedIn, async(req,res,next)=>{
    next();
})


//filter out pet output
router.get("/search", async (req,res,next) =>{
    console.log("searchhh")
    try{
        console.log("IN THE ROUTE")
        const {breed, size, gender, age} = req.query;
        console.log(breed)
        await axios.get(`${apiURL}/animals?breed=${breed}&size=${size}&gender=${gender}$age=${age}`,config)
        .then((result)=>{
            res.json(result)
        })
    }catch(e){
        next(e)
    }
})

//This route gives the user all of the pets of the pet type of their choice
router.get('/', async (req,res,next) =>{
    try{
        const {type} = req.query;
        // hardcoded type for now. Figure out how to get user to decide query params
        await axios.get(`${apiURL}/animals?type=${type}`,config)
        .then((result) => {
            let findDogs = result.data
            res.json(findDogs)
        })
    } catch(e){
        next(e)
    }
})



//get a specific pet from API with their ID
router.get('/:id', async (req,res,next) =>{
    try{
        const id = req.params.id;
        await axios.get(`${apiURL}/animals/${id}`, config)
        .then(result =>{ res.json(result.data.animal)})
    } catch(e){
        next(e)
    }
})


//Create favorite for the user and put in database
router.post("/:id", async(req,res,next) =>{
    try{
        const id = req.params.id;
        await axios.get(`${apiURL}/animals/${id}`, config)
        .then(result =>{
            let favPet = result.data.animal
            let data ={
                id: favPet.id,
                type: favPet.type,
                breed: favPet.breeds.primary,
                gender: favPet.gender,
                age: favPet.age,
                spayed_neutered: favPet.attributes.spayed_neutered,
                color: favPet.colors.primary,
                description: favPet.description,
                location: favPet.contact.address.state,
                image_url: favPet.primary_photo_cropped.full,
                organization_id: favPet.organization_id
            }
            Pet.create(data)
            return res.status(201).json({data})
        })

    }catch(e){
        next(e)
    }
})



//delete dog based on id
router.delete("/favorite/:id", async (req,res,next) =>{
    try{
        await Pet.delete(req.params.id)
        return res.json({msg: "Deleted"})
    } catch(e){
        return next(e)
    }
})


// //header prac
// router.get("/headers", (req,res)=>{
//     const lang = req.headers['accept-language']
//     res.send(`Youre language preference is ${lang}`)
// })

// //body prac
// router.post("/register", (req,res) =>{
//     res.send(`Welcome ${req.body.username}`);
// })





// //update dog
// router.put("/:id", async (req,res,next) =>{
//     try{
//        const {name, age} = req.body;
//        const cat = await Pet.update(req.params.id, name, age)
//         return res.json(cat)
//     } catch(e){
//         return next(e)
//     }
// })



module.exports = router;
