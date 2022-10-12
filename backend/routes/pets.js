const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")

let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6IjYyMjk2OWJiMmJhYzVjZDhhZTU3MWU0NWY1YzQ1OTUwYzZkZGMwMDk0OTAwOTQ3YTczNzk1ZjliODAwOWUwYjk4MDVjYWZjMGJiMTYyZWFiIiwiaWF0IjoxNjY1NTgzNDg3LCJuYmYiOjE2NjU1ODM0ODcsImV4cCI6MTY2NTU4NzA4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.KSa2QUh1XV9Vsrx46iUkOwrQ9WBh0eXLp4t_lIQj-N162IqjfxxlRTXhw3dviMIkBz10Skc7MnikOp1khxvTXTOJ72E-3I1TMak3q96lJS2XXidvchChQL8kCP_c-RAJ-hh0db_0pDu9IkClQsyHCqINKZGGo0FbJF-DtwpMJ-OW9W9XdeINkUp3J7prAHP9HVPFaAsvycA71H5xB7HIV3FHzkEFbPThcrIRvV2QrgcZrDaqK6KFQfJBltpuWxJNvVHkPGbgDbQyyo9ujlLUMa6cPFgJcZtmgWNnaCwseN1vNV5BwaysAZUipyFWnPcxwa2eQgP2NDi91mLE5t9dMA"
// axios.defaults.headers.common["Authorization"] = 'Bearer ' + accessToken **didn't work!
const apiURL = "https://api.petfinder.com/v2"
const config ={
    headers:{
        "Authorization": "Bearer " + accessToken
    }
}


//This route gives the user all of the pets of the pet type of their choice
router.get('/', async (req,res,next) =>{
    try{
        const {type} = req.query;
        // hardcoded type for now. Figure out how to get user to decide query params
        await axios.get(`${apiURL}/animals/?type=Dog`,config)
        .then(result => {
            let findDogs = result.data
            res.json(findDogs)
        })
    } catch(e){
        next(e)
    }
})

//get a specific pet with their ID
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
                image_url: favPet.primary_photo_cropped.full
            }
            const newPet = Pet.create(data)
            return res.status(201).json({newPet})
        })
    }catch(e){
        next(e)
    }
})


// router.get("/search", (req,res,next) =>{
//    try{
//     if(req.query.location !== "osaka"){
//         throw new ExpressError("WRONG PASS", 403)
//     }
//         const {location, breed} = req.query;
//     res.send(`location: ${location} breed : ${breed}`)
// } catch(e){
//     next(e)
// }
// })

// //header prac
// router.get("/headers", (req,res)=>{
//     const lang = req.headers['accept-language']
//     res.send(`Youre language preference is ${lang}`)
// })

// //body prac
// router.post("/register", (req,res) =>{
//     res.send(`Welcome ${req.body.username}`);
// })

// //responding with json
// router.get("/alldogs", (req,res)=>{
//     res.json(dogs);
// })

// //make new dog
// router.post("/alldogs", (req,res) =>{
//     dogs.push(req.body);
//     //configure status code returned
//     res.status(201).json(dogs)
// })


// //delete dog
// router.delete("/:id", async (req,res,next) =>{
//     try{
//         await Pet.delete(req.params.id)
//         return res.json({msg: "Deleted"})
//     } catch(e){
//         return next(e)
//     }
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
