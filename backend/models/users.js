const db = require("../db")
const ExpressError = require("../expressError")
const bcrypt = require("bcrypt")

const {BCRYPT_WORK_FACTOR} = require("../config")


class User{

    static async authenticate(username, password){
        const result = await db.query(
            `SELECT username,
                    password
            FROM users
            WHERE username = $1`,
            [username],
        );
        const user = result.rows[0];
        if(user){
            const isValid = await bcrypt.compare(password,user.password);
            if(isValid){
                return user;
            }
        }
        throw new ExpressError("Invalid username/password", 401)
    }


    static async register({username,password,firstName,lastName,email}){
        const dupCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username],
        );
        if(dupCheck.rows[0]){
            throw new ExpressError("Username already taken", 401)
        }

        const hashedPassword = await bcrypt.hash(password,BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
                (username,
                password,
                first_name,
                last_name,
                email)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                email,
            ],
        );

        const user = result.rows[0]

        return user;
    }

    static async getUser(username){
        const userRes = await db.query(
            `SELECT (username,
                    password,
                    first_name,
                    last_name,
                    email)
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = userRes.rows[0];

        if(!user){
            throw new ExpressError("User not found", 404)
        }
        //got rid of favorites table!
        // grab the favorites of that user
        // const userFavorites = await db.query(
        //     `SELECT favorites.pet_id
        //     FROM favorites
        //     WHERE favorites.username = $1`,
        //     [username]
        // );

        // user.favorites = userFavorites.rows.map(f => f.pet_id);

        return user;
    }

    //add to favorite
    static async addPetFav(username, petId){
        const petCheck = await db.query(
            `SELECT pet_id
            FROM pets
            WHERE pet_id = $1`,
            [petId]
        );

        const pet = petCheck.rows[0]

        if(!pet) throw new ExpressError("Pet not found", 404)
    }

    static async deleteUser(username){
        const userRes = await db.query(
            `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`,
            [username],
        );

        const user = userRes.rows[0];

        if(!user){
            throw new ExpressError("User not found", 404)
        }
    }
}

module.exports = User;
