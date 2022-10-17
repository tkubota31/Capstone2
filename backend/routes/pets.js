const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")
const {ensureLoggedIn} = require("../middleware/auth")

const jsonschema = require("jsonschema");
const favPetSchema = require("../schemas/favPet.json");

let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6IjFhYWUwYmE3N2RkMGViNTA5YzAyZDQxN2I0ODZlMGE2ODM3ZjUwZDkyODc0MzkxYzZlNTIyMTQzYmU0Y2E0OGU1ZmZiMzM5NjkzNzIyMDNjIiwiaWF0IjoxNjY2MDI3ODU0LCJuYmYiOjE2NjYwMjc4NTQsImV4cCI6MTY2NjAzMTQ1NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.ATKQPq59s7gWTTIg_xT793Qh8oJKLVdIM70b1sLy7KvpLsGGuWW7TS4zH9Kd1mglbEqTAvzqCy4oFHU0aeE5c_SYJIIu2HfZ1bKuVun1igGjoydMLPh3UGXumO8fv1pL9qv2tEt21GJebpqpmsPDInI6VL5MdyHN-Wxm4NXV-eZ-EKKOBiRU7iTRLhKQ5E8SVCr6ABUl6_IJNvcIyDmC-wqaOp8K7MArDB_tUm2yE5yx7lEW8kbNEk9Iaq8eQbqLMC-tw8PjzZ7fgUaNQN9iXJ3QlerI7P_Dm8DWkRJAokQGxYa1gs1ChdKqv69fM_CLUch5-o7OUrIF7aUyTXZ6Eg"
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
