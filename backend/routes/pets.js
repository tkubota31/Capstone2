process.env.NODE_ENV = "production"
const express = require("express")
const router = new express.Router()
const axios = require("axios")
const Pet = require("../models/pets")
const { ensureLoggedIn } = require("../middleware/auth")

const jsonschema = require("jsonschema");
const favPetSchema = require("../schemas/favPet.json");
const app = require("../app")



const tokenAuth = {
    "grant_type": "client_credentials",
    "client_id": "5ixH8MOVGnQx6pe5WZ3o8MXbci27FUolrtuGF37uJ4E2fFnJol",
    "client_secret": "6HAEXzcmExEIrpJszeWbNryp6GD9zInaZjCUIVDb"
}

let accessToken = "";
// let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1aXhIOE1PVkduUXg2cGU1V1ozbzhNWGJjaTI3RlVvbHJ0dUdGMzd1SjRFMmZGbkpvbCIsImp0aSI6ImZmNGM5NDkxMTE3OWNkMTY2MmJmY2QzYmQzMGVjZjFmN2IzYmE5ZGY2NzM2ZDkzYzA5ZDYyYTExNTFmNTVkZWFlNzAxNGQ5M2I3YjQyM2UyIiwiaWF0IjoxNjY5NTcyOTk1LCJuYmYiOjE2Njk1NzI5OTUsImV4cCI6MTY2OTU3NjU5NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.PFWzicPaAu4R4CFLr_JwDRw21jBNpjYfyOD47oHRL0sRcdJot3o1yXj0lkYK_3oKk4j5RnoVRdu2Q_jPf7Z9QA5QUYfPKA-khCeEoZhJgUL_O0_m5YGS63aer3-0PPhgS_5k1zbpjN8_XadP-9gF2kLyhVYBljHpqbAY7oZuZMvyKsexZidQAB0Fz3jYVImBEG_bAz5IQzMYIqrcSScghu22-OUNjC8F2oH7sgYj0_y-nldJEF1PDrqJfqd7hbcNKIEAqZp2ERRHdCUWkX3mzVObwgZ3RcqAK0KSC6PFlw8Q2evew10pWW2ZPCOzVyBXLx5upxu84p2F947eP2k8zQ"
// request to get accessToken
async function getAccessToken() {
    if (process.env.NODE_ENV == "production") {
        await axios.post("https://api.petfinder.com/v2/oauth2/token", tokenAuth)
            .then((result) => {
                accessToken = result.data.access_token
            })
    }
}


const apiURL = "https://api.petfinder.com/v2"

// let res.locals.config ={
//     headers:{
//         "Authorization": "Bearer " + accessToken
//     }
// }

const retry = async (fn) => {
    let tryCount = 0;
    while (tryCount < 3) {
        try {
            return await fn();
        } catch (e) {
            tryCount++
            if (tryCount === 2) {
                next(e)
            }
            if (e.response.status === 401) {
                console.log("no token")
                await getAccessToken()
            }
        }
    }
}


// get accessToken
router.use("/*", async (req, res, next) => {
    console.log("STAR PATH***")
    if (!accessToken) {
        await getAccessToken()
    }

    res.locals.config = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }
    next();
})




//filter out pet output
router.get("/search", ensureLoggedIn, async (req, res, next) => {
    await retry(() => {
        const { type, breed, gender, age, color, location } = req.query;
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
        for (let key in filterObj) {
            console.log(key, filterObj[key])
            if (filterObj[key] === undefined || filterObj[key] === "") {

                delete filterObj[key]
            }
        }

        let newUrl = new URLSearchParams(filterObj).toString()
        axios.get(`${apiURL}/animals/?${newUrl}`, res.locals.config)
            // console.log(`${apiURL}/animals?breed${breed ? `= ${breed}` : "="}&gender=${gender}&age=${age}&color=${color}&location${location}`)
            // await axios.get(`${apiURL}/animals?breed=${breed}&gender=${gender}&age=${age}&color=${color}&location=${location}`,config)
            .then((result) => {
                res.json(result.data)
            })
    })
})

//This route gives the user all of the pets of the pet type of their choice
router.get('/', ensureLoggedIn, async (req, res, next) => {
    await retry(() => {
        const { type } = req.query;
        //Figure out how to get user to decide query params
        axios.get(`${apiURL}/animals?type=${type}`, res.locals.config)
            .then((result) => {
                let petSearch = result.data
                res.json(petSearch)
            })
    })
})


//Create favorite for the user and put in database
router.post("/favorite/:id/:username", async (req, res, next) => {
    await retry(() => {
        const id = req.params.id;
        const username = req.params.username;
        axios.get(`${apiURL}/animals/${id}`, res.locals.config)
            .then((result) => {
                let favPet = result.data.animal
                let data = {
                    pet_id: favPet.id,
                    name: favPet.name,
                    type: favPet.type,
                    breed: favPet.breeds.primary,
                    gender: favPet.gender,
                    age: favPet.age,
                    spayed_neutered: favPet.attributes.spayed_neutered,
                    color: favPet.colors.primary ? favPet.colors.primary : "Unknown",
                    description: favPet.description,
                    location: favPet.contact.address.state,
                    image_url: favPet.primary_photo_cropped.full ? favPet.primary_photo_cropped.full : "Unavailable",
                    organization_id: favPet.organization_id,
                    user_username: username
                }
                const validator = jsonschema.validate(data, favPetSchema);
                if (!validator.valid) {
                    const errs = validator.errors.map(e => e.stack);
                    console.error('validator errors:', errs)
                    return res.status(400).json({ error: errs });
                    // return next(errs)
                }
                Pet.create(data)
                return res.status(201).json({ data })
            })
    })
})

//return info on single animal type, (so i can grab all possible colors)
router.get("/onetype/:type", async (req, res, next) => {
    await retry(() => {
        const type = req.params.type;
        axios.get(`${apiURL}/types/${type}`, res.locals.config)
            .then(result => {
                res.json(result.data)
            })
    })
})


//Lists all available types of pets
router.get("/types", async (req, res, next) => {
    await retry(() => {
        axios.get(`${apiURL}/types`, res.locals.config)
            .then(result => {
                // console.log(result)
                res.json(result.data.types)
            })
    })
})



//get a specific pet from API with their ID
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
    await retry(() => {
        const id = req.params.id;
        axios.get(`${apiURL}/animals/${id}`, res.locals.config)
            .then(result => {
                res.json(result.data.animal)
            })
    })
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


//route to list all breeds of certain animal type
router.get("/breeds/:type", ensureLoggedIn, async (req, res, next) => {
    await retry(() => {
        const type = req.params.type;
        axios.get(`${apiURL}/types/${type}/breeds`, res.locals.config)
            .then(result => {
                let allBreeds = result.data
                res.json(allBreeds)
            })
    })
})


//route to get all pets that are favorited
router.get("/favorite/:username", async (req, res, next) => {
    await retry(async () => {
        const username = req.params.username;
        const result = await Pet.getAllFavPet(username);
        return res.json({ result })
    })

})


//route to get company info about the pet
router.get("/company/:orgId", ensureLoggedIn, async (req, res, next) => {
    await retry(() => {
        const orgId = req.params.orgId
        axios.get(`${apiURL}/organizations/${orgId}`, res.locals.config)
            .then(result => {
                let orgInfo = result.data
                res.json(orgInfo)
            })
    })
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

//delete pet based on id and username
router.delete("/favorite/:id/:username", async (req, res, next) => {
    await retry(async () => {
        console.log("INSIDE BACKEND DELETE ROUTE")
        await Pet.delete(req.params.id, req.params.username)
        return res.json({ msg: "Deleted" })
    })
})

router.post("/test", async (req, res, next) => {
    try {
        const unchTest = {
            Dog: "Lucky",
            Cat: "Kaia"
        }
        return res.status(201).json(unchTest)
    } catch (e) {

    }
})




module.exports = router;
