const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")
const {ensureLoggedIn,ensureCorrectUser} = require("../middleware/auth")

const jsonschema = require("jsonschema");
const favPetSchema = require("../schemas/favPet.json");
const app = require("../app")


const tokenAuth = {
	"grant_type": "client_credentials",
	"client_id": "5ixH8MOVGnQx6pe5WZ3o8MXbci27FUolrtuGF37uJ4E2fFnJol",
	"client_secret": "6HAEXzcmExEIrpJszeWbNryp6GD9zInaZjCUIVDb"
}

// let accessToken = async () =>{
//     await axios.post("https://api.petfinder.com/v2/oauth2/token", tokenAuth)
//     .then((result) =>{
//         console.log(result.data.access_token)
//        return(result.data.access_token)
// })}


let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6ImYwMmRjMTRiODg3M2YwNmI5YjQxZWE4NzEzMTM5OGViM2NmNjkxZDI0YTFiYjcyYzg1MDg5ZTJkZDk4YzQyOWI5NTIzODA1ZGM2YThiYmVmIiwiaWF0IjoxNjY5MTUyNTg3LCJuYmYiOjE2NjkxNTI1ODcsImV4cCI6MTY2OTE1NjE4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.ht20dFUIOgbZm7ZDw3DJWrPKr-q4f_yl_6CyPqzCTiSQlrEM_4weqlnF8oU82qa62ZyLnRKN1Cd5Dso1jMOM8yYE6q9Zq050FXwQCERVa6zFWn2gYisbSUh4Wmbhav1zGv465ysXk6QiDoQupjwZczM0fuqYhYfZvHsRxCjiwFbSisw_ztOYSa2TDmmDCJKQpfnWkMS51WjX4dr3SlUPHG0NzgN3NVGnZvsPX6Wpzmd36G5OABlvSMNu_7DLLmVJhGSURkG6T7lFkskJS7rrwa5485Okb_1Vz13slQGa6fNIRRVftFPSRbaKcytB_2nwnMZR3IrL4zHnrIK6O54SxA"
// request to get accessToken
async function getAccessToken(){
    await axios.post("https://api.petfinder.com/v2/oauth2/token", tokenAuth)
    .then((result) =>{
        console.log(result.data.access_token)
       return(result.data.access_token)
    })
}



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
router.get("/search", ensureLoggedIn, async (req,res,next) =>{
    try{
        const {type,breed, gender, age, color, location} = req.query;
        const filterObj = {
            type,
            breed,
            gender,
            age,
            color,
            location
        }
        console.log(filterObj)

        //if query param is undefined, delete it so that it will not go into the url
        for( let key in filterObj){
            console.log(key, filterObj[key])
            if(filterObj[key] === undefined || filterObj[key] === ""){

                delete filterObj[key]
            }
        }

        let newUrl= new URLSearchParams(filterObj).toString()
        console.log(newUrl)
        await axios.get(`${apiURL}/animals/?${newUrl}`, config)
        // console.log(`${apiURL}/animals?breed${breed ? `= ${breed}` : "="}&gender=${gender}&age=${age}&color=${color}&location${location}`)
        // await axios.get(`${apiURL}/animals?breed=${breed}&gender=${gender}&age=${age}&color=${color}&location=${location}`,config)
        .then((result)=>{
            console.log(result)
            res.json(result.data)
        })
    }catch(e){
        next(e)
    }
})

//This route gives the user all of the pets of the pet type of their choice
router.get('/', ensureLoggedIn, async (req,res,next) =>{
    try{
        const {type} = req.query;
        //Figure out how to get user to decide query params
        await axios.get(`${apiURL}/animals?type=${type}`,config)
        .then((result) => {
            let petSearch = result.data
            res.json(petSearch)
        })
    } catch(e){
        next(e)
    }
})

//return info on single animal type, (so i can grab all possible colors)
router.get("/onetype/:type", async (req,res,next) =>{
    try{
        const type = req.params.type;
        await axios.get(`${apiURL}/types/${type}`, config)
        .then(result =>{
            res.json(result.data)
        })
    }catch(e){
        next(e)
    }
})

//Lists all available types of pets
router.get("/types", ensureLoggedIn, async(req,res,next) =>{
    try{
        await axios.get(`${apiURL}/types`, config)
        .then(result =>{
            // console.log(result)
            res.json(result.data.types)
        })
    }catch(e){
        next(e)
    }
})



//get a specific pet from API with their ID
router.get('/:id', ensureLoggedIn, async (req,res,next) =>{
    try{
        const id = req.params.id;
        await axios.get(`${apiURL}/animals/${id}`, config)
        .then(result =>{ res.json(result.data.animal)})
    } catch(e){
        next(e)
    }
})

//trying to get pet from fav table to check if already there
// router.get("/:id/:username", async (req,res,next) =>{
//     try{
//         const {id,username} = req.params.id;
//         Pet.getPet()
//     }catch(e){
//         next(e)
//     }
// })


//Create favorite for the user and put in database
router.post("/favorite/:id/:username", async(req,res,next) =>{
    try{
        const id = req.params.id;
        const username = req.params.username
        await axios.get(`${apiURL}/animals/${id}`, config)
        .then(result =>{
            let favPet = result.data.animal
            let data ={
                pet_id: favPet.id,
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
                organization_id: favPet.organization_id,
                user_username: username

            }
        const validator = jsonschema.validate(data, favPetSchema);
        // console.log(validator)
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

//route to list all breeds of certain animal type
router.get("/breeds/:type", ensureLoggedIn, async (req,res,next) =>{
    try{
        const type = req.params.type;
        await axios.get(`${apiURL}/types/${type}/breeds`, config)
        .then(result =>{
            let allBreeds = result.data
            res.json(allBreeds)
        })
    }catch(e){
        return next(e)
    }
})

//route to get all pets that are favorited
router.get("/favorite/:username", async(req,res,next) =>{
    try{
        const username = req.params.username;
        const result = await Pet.getAllFavPet(username);
        return res.json({result})
    }catch(e){
        return next(e)
    }
})

//route to get company info about the pet
router.get("/company/:orgId", async (req,res,next) =>{
    try{
        const orgId = req.params.orgId
        await axios.get(`${apiURL}/organizations/${orgId}`, config)
        .then(result =>{
            let orgInfo = result.data
            res.json(orgInfo)
        })
    }catch(e){
        return next(e)
    }
})

//route to check if pet is already in favorites table
// router.get("/favorite/:id/:username", async (req,res,next) =>{
//     try{
//         const {id,username} = req.params;
//         await Pet.getPet(id,username)
//         return res.json({msg: "Pet Found"})
//     }catch(e){
//         next(e)
//     }
// })

//delete dog based on id and username
router.delete("/favorite/:id/:username", async (req,res,next) =>{
    console.log("BACKEND DELETE ROUTE")
    try{
        console.log("INSIDE BACKEND DELETE ROUTE")
        await Pet.delete(req.params.id,req.params.username)
        return res.json({msg: "Deleted"})
    } catch(e){
        return next(e)
    }
})




module.exports = router;
