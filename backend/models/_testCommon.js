const db = require("../db")

async function commonBeforeAll() {

    await db.query("DELETE FROM users");

    await db.query("DELETE FROM pets");

    await db.query(`
        INSERT INTO pets(
            pet_id,
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
        VALUES ('pet_id1',
                'testName',
                'testType',
                'testBreed',
                'testGender',
                'testAge',
                true,
                'testColor',
                'testDescription',
                'testLocation',
                'testImage_url',
                'testOrgId',
                'test_user_username'
                )
        `)


    await db.query(`
            INSERT INTO users(
                username,
                password,
                first_name,
                last_name,
                email)
            VALUES ('testUser',
                'testPassword',
                'testFirstName',
                'testLastName',
                'test@Email.com')
        `)
}

async function commonBeforeEach() {
    // axios.post.mockResolvedValue()
    await db.query("BEGIN");
  }

async function commonAfterEach() {
    await db.query("ROLLBACK");
  }
async function commonAfterAll() {
    await db.end();
  }


  module.exports ={
    commonBeforeAll,
    commonAfterAll,
    commonBeforeEach,
    commonAfterEach
}
