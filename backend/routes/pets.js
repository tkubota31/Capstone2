const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")

let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6IjU5ZmU0YzdmYjU1ZDhmMzVhMTA1ZDFhNzYxMWI5Y2ZkNzA4YzRlMDI5ZWUwYTY2ZjlkMTE3MmU3MzZjNjJiODI4M2NiZjQ5YWFmNWE2MjRmIiwiaWF0IjoxNjY1NjEzODg3LCJuYmYiOjE2NjU2MTM4ODcsImV4cCI6MTY2NTYxNzQ4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.GffCdR6cYJ-CoO2zrJk0vyBDIti171ZKh8FDid30jH_jXVcN2pesL0UmAdk81yoyZiPuKNKW8qZ50x_a12RXF3uNQ8I-RnGpN9b1KqJRzOqSxBZBU59iOZUQd47efdVjcr8AqCTIHY5DnFm25NCtKaoARziWBbAKp-k-uodqdyFO-jNNFeWBVShTYNyAbwMu6ebnMaXb_c1xlaKm9roPHKO0kngoImEEi9iBW_AVgsvqkDn_s4OY6cZpGD_zY6bhpTyQ5NBcr-JHMELg7RsoQJ7ybxv0n2Ib3X9Cxo15uzmLQa7REmx1reufuJj83jZ3Jro2JyemCreJPeDIz4VGPA"
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
        await axios.get(`${apiURL}/animals?type=${type}`,config)
        .then((result) => {
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
                image_url: favPet.primary_photo_cropped.full,
                organization_id: favPet.organization_id
            }
            Pet.create(data)
            //relation pets doesn't exists error
            console.log("*******")
            return res.status(201).json({data})
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
