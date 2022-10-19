const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")
const {ensureLoggedIn} = require("../middleware/auth")

const jsonschema = require("jsonschema");
const favPetSchema = require("../schemas/favPet.json");

let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6ImVhMDY0ZTM5MmQyNzVhOWJmNDYxMTAwZmFjYjJiMjkzZTVjNmJhOGZjNDk1MDE4MWJiMzQyMmM2ZTg1MzU1ZDQwNDgxODA4NmUwNWY5NGIxIiwiaWF0IjoxNjY2MTAyOTUyLCJuYmYiOjE2NjYxMDI5NTIsImV4cCI6MTY2NjEwNjU1Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.NY5wFXzVkqptkit9sSKuElKySuibqZEQqMAHsEfy655qmbInDsQFnHmzP3Qxah1oY1DDKK7PC1mWCjEBlfbWPk8rKwoYh6osjr8KiTguWsh8Ep4jWJTOjJ8MnRgRturhHzwDrqylUinxc4QwlWOqOv8GHopF314hSIyDUMWWRlO2DZC2_gg1zLC_kivgKsyAcED0KISHShVBplAflr5ksCceKjUppFuaU3bCQG-AdROaSCUAEhLLnCMyxSKDmTG7cBWNTnEF_PctS0sdraGCULaqy0_NosYmNsd1OqWkGZ6fEMRba11crdQGYdXxU5NyS2zq82JTHWI1MgtogswowA"
// axios.defaults.headers.common["Authorization"] = 'Bearer ' + accessToken **didn't work!
const apiURL = "https://api.petfinder.com/v2"
const config ={
    headers:{
        "Authorization": "Bearer " + accessToken
    }
}

// makes ensureLoggedIn method run for every route that has /pets
// router.get("/*", ensureLoggedIn, async(req,res,next)=>{
//     next();
// })


//filter out pet output
router.get("/search", async (req,res,next) =>{
    console.log("searchhh")
    try{
        console.log("IN THE ROUTE")
        const {breed, size, gender, age} = req.query;
        console.log(breed)
        await axios.get(`${apiURL}/animals?breed=${breed}&size=${size}&gender=${gender}$age=${age}`,config)
        .then((result)=>{
            console.log(result)
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
            let petSearch = result.data
            res.json(petSearch)
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
router.post("/favorite/:id", async(req,res,next) =>{
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
                color: favPet.colors.primary ? favPet.colors.primary : "Unknown",
                description: favPet.description,
                location: favPet.contact.address.state,
                image_url: favPet.primary_photo_cropped.full ? favPet.primary_photo_cropped.full : "Unavailable" ,
                organization_id: favPet.organization_id
            }
        const validator = jsonschema.validate(data, favPetSchema);
        console.log(validator)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            return next(errs)
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
