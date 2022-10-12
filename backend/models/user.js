const db = require("../db")
const ExpressError = require("../expressError")
const bcrypt = require("bcrypt")

const {BCRYPT_WORK_FACTOR} = require("../config")


class User{

    static async authenticate(username, password){
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name,
                    last_name,
                    email
            FROM users
            WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if(user){
            const isValid = await bcrypt.compare(password,user.password);

            if(isValid ===true){
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
            RETURNING username, first_name, last_name, email`,
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


}