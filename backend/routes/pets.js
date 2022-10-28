const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")
const {ensureLoggedIn} = require("../middleware/auth")

const jsonschema = require("jsonschema");
const favPetSchema = require("../schemas/favPet.json");

let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6IjRlMWYxYjgxOGY1OWVhYmY4N2MxMjQ5NjViYjU0MWQzNzA3NzVhNTJhNTExY2VlNjQ0ZDQ4NTFlNzEyNGMzY2FkYWQ1NWE1OWEwMDg4ZWE5IiwiaWF0IjoxNjY2OTIxOTIxLCJuYmYiOjE2NjY5MjE5MjEsImV4cCI6MTY2NjkyNTUyMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.HQjofG1jIfJfKWTjtY-ncKMceq9_jvt8lHhuJ8j5HHuCLQdEEQtwycoLreVe5EaJqieyoTTK7JtCo6fYClIX4sFVO2wPcZPdNNIxJ_MITPrkEdDVOPNWXDuyXZzGMmm4TYBgYVzRrqSfEhcuUKbhn4k573h8S-5_rfZD_KuORr6ouiYa7_soRhLFHBn3fFv2GxLvRc2UqROyLyIH3MPL9QGpiLCbdsiJxQxUE_JbWLVCw8NMvExVQcGY9338xw0_gMf8xCLsxM7zkwlhr8PBZnlYnIoOsfNwFOWdPFLUN_-3xYOoPwLzSTRbFtEuED04L7gK4CMVPcqIBi0DzGnJ8g"
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
        const {breed, gender, age, color, location} = req.query;
        const filterObj = {
            breed,
            gender,
            age,
            color,
            location
        }
        for( let key in filterObj){
            if(filterObj[key] ===undefined){
                delete filterObj[key]
            }
        }

        let newUrl= new URLSearchParams(filterObj).toString()
        console.log(newUrl,`${apiURL}/animals/?${newUrl}`)
        await axios.get(`${apiURL}/animals/?${newUrl}`, config)
        // console.log(`${apiURL}/animals?breed${breed ? `= ${breed}` : "="}&gender=${gender}&age=${age}&color=${color}&location${location}`)
        // await axios.get(`${apiURL}/animals?breed=${breed}&gender=${gender}&age=${age}&color=${color}&location=${location}`,config)
        .then((result)=>{
            res.json(result.data)
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
                name:favPet.name,
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
