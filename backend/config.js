const DB_URI = (process.env.NODE_ENV ==="test")
? "postgresql:///capstone2_test"
: "postgresql:///capstone2";

const SECRET_KEY = process.env.SECRET_KEY || "Taioh's Secret"

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
    DB_URI,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
}
