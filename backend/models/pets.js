const db = require("../db")
const ExpressError = require("../expressError")

//example class and methods
class Pet{

    static async create(data){
        const result = await db.query(`INSERT INTO pets(pet_id,
                                                        type,
                                                        breed,
                                                        gender,
                                                        age,
                                                        spayed_neutered,
                                                        color,
                                                        description,
                                                        location,
                                                        image_url,
                                                        organization_id)
                                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
                                    RETURNING pet_id, type, breed, gender,age,spayed_neutered,color,description,location,image_url,organization_id`,
                                    [
                                        data.id,
                                        data.type,
                                        data.breed,
                                        data.gender,
                                        data.age,
                                        data.spayed_neutered,
                                        data.color,
                                        data.description,
                                        data.location,
                                        data.image_url,
                                        data.organization_id
                                    ]);
    return result.rows[0]
    }

    static async getPet(id){
        const result = await db.query(
            `SELECT (pet_id,
                    type,
                    breed,
                    gender,
                    age,
                    spayed_neutered,
                    color,
                    description,
                    location,
                    image_url,
                    organization_id)
            FROM pets
            WHERE pet_id = $1`,
            [id]
        );

        if(!result.rows.length ===0){
            throw new ExpressError("Pet not found", 404)
        }

        return result.rows[0];
    }

    static async delete(id){
        const result = await db.query(`
        DELETE FROM pets
        WHERE id = $1
        RETURNING id`,
        [id])
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
