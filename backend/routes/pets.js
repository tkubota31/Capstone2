const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")

let accessToken = "eeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6IjU1NTE0MzdmN2U3ZjljZGQ0NmFjNjM4NTMzNTkzZjI0NTFmNjNkNDY2NmZhNDJkNTZlZjU0MzBlYWViZmU1MDcyODA2ZDM2ZDBjZjNhNjQxIiwiaWF0IjoxNjY1NjAxMjM2LCJuYmYiOjE2NjU2MDEyMzYsImV4cCI6MTY2NTYwNDgzNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.RfhmxvCjM0IlG_ThrklSPIvhJ2GaM1pkyVBl9AN9HoiOs3kT-xEvTk0ZrKBbSYUoBizcL_YGFth6rcYDc2_wBiV9k-sjxxW_BcSp0hlxweGQv7CZ3Rw-2mOAsMHHX0tGpKJ5Y1tR2Wf_WEaURo-9m3YnuhsaWhcLIODbZjShfOFdZ6XDTzeuNgN302Un9UoTsJR0TZJFiT2Zbj1_DAnWXrkTfP63qIltg7ZcK6VrJWochppSf6e0lc-2GAaf9iL9T0HHEvhHXnfwu4OsjcPLaGuOaDy5y9Xe7aWxSLn-bwOUE782DDdj12ZSTVDLdjkX3LmED7BEUWF1zXopmtH70Q"
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
        console.log("In the Route")
        const {type} = req.query;
        // hardcoded type for now. Figure out how to get user to decide query params
        await axios.get(`${apiURL}/animals?type=${type}`,config)
        .then((result) => {
            let findDogs = result.data
            res.json(findDogs)
        })
    } catch(e){
        console.log("error section")
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
                image_url: favPet.primary_photo_cropped.full,
                organization_id: favPet.organization_id
            }
            const newPet = Pet.create(data)
            //relation pets doesn't exists error
            console.log("*******")
            return res.status(201).json({newPet})
        })

    }catch(e){
        next(e)
    }
})


//get pet from filters
router.get("/search", async (req,res,next) =>{
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

//delete dog based on id
router.delete("/:id", async (req,res,next) =>{
    try{
        await Pet.delete(req.params.id)
        return res.json({msg: "Deleted"})
    } catch(e){
        return next(e)
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
