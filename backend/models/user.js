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


    static async
}
