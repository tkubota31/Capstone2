const db = require("../db")
const ExpressError = require("../expressError")

//example class and methods
class Pet{

    static async create(data){
        const result = await db.query(`INSERT INTO pets(pet_id,
                                                        name,
                                                        type,
                                                        breed,
                                                        gender,
                                                        age,
                                                        spayed_neutered,
                                                        color,
                                                        description,
                                                        location,
                                                        image_url,
                                                        organization_id,
                                                        user_username)
                                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
                                    RETURNING pet_id, name, type, breed, gender,age,spayed_neutered,color,description,location,image_url,organization_id`,
                                    [
                                        data.pet_id,
                                        data.name,
                                        data.type,
                                        data.breed,
                                        data.gender,
                                        data.age,
                                        data.spayed_neutered,
                                        data.color,
                                        data.description,
                                        data.location,
                                        data.image_url,
                                        data.organization_id,
                                        data.user_username
                                    ]);
    return result.rows[0]
    }

    static async getPet(id){
        console.log("bACKEN GETPET")
        console.log(id)
        const result = await db.query(
            `SELECT pet_id,
                    name,
                    type,
                    breed,
                    gender,
                    age,
                    spayed_neutered,
                    color,
                    description,
                    location,
                    image_url,
                    organization_id,
                    user_username
            FROM pets
            WHERE pet_id = $1`,
            [id]
        );
        if(result.rows.length ===0){
            throw new ExpressError("Pet not found", 404)
        }

        return result.rows[0];
    }

    // static async getPet(id,username){
    //     console.log("bACKEN GETPET")
    //     console.log(id,username)
    //     const result = await db.query(
    //         `SELECT pet_id,
    //                 name,
    //                 type,
    //                 breed,
    //                 gender,
    //                 age,
    //                 spayed_neutered,
    //                 color,
    //                 description,
    //                 location,
    //                 image_url,
    //                 organization_id,
    //                 user_username
    //         FROM pets
    //         WHERE pet_id = $1 AND user_username = $2`,
    //         [id,username]
    //     );
    //     if(result.rows.length ===0){
    //         throw new ExpressError("Pet not found", 404)
    //     }

    //     return result.rows[0];
    // }

    static async getAllFavPet(username){
        const result = await db.query(
            `SELECT pet_id,
                    name,
                    type,
                    breed,
                    gender,
                    age,
                    spayed_neutered,
                    color,
                    description,
                    location,
                    image_url,
                    organization_id,
                    user_username
            FROM pets
            WHERE user_username = $1`,
            [username]
        );

        if(result.rows.length ===0){
            throw new ExpressError("No pets favorited", 404)
        }
        return result.rows
    }

    static async delete(id,username){
        console.log("INSIDE QUERY")
        const result = await db.query(`
        DELETE FROM pets
        WHERE pet_id = $1 AND user_username = $2
        RETURNING pet_id`,
        [id,username])
        if(result.rows.length ===0){
            throw new ExpressError("Pet not found", 404)
        }
    }

    // static async update(id,newName,newAge){
    //     const result = await db.query(`
    //     UPDATE pets SET name = $1, age= $2
    //     WHERE id = $3
    //     RETURNING id,name,age`,
    //     [id,newName,newAge])
    //     if(result.rows.length ===0){
    //         throw new ExpressError("Pet not found", 404)
    //     }
    //     return result.rows[0]
    // }
}

module.exports = Pet;
