-- CREATE TABLE users (
--     username VARCHAR(25) PRIMARY KEY,
--     password TEXT NOT NULL,
--     first_name TEXT NOT NULL,
--     last_name TEXT NOT NULL,
--     email TEXT NOT NULL
--         CHECK (position('@' IN email) > 1)
-- );

-- CREATE TABLE pets(
--     pet_id VARCHAR(25) PRIMARY KEY,
--     type TEXT NOT NULL,
--     breed TEXT NOT NULL,
--     gender TEXT NOT NULL,
--     age TEXT NOT NULL,
--     spayed_neutered BOOLEAN NOT NULL,
--     color TEXT NOT NULL,
--     description TEXT NOT NULL,
--     location TEXT NOT NULL,
--     image_url TEXT,
--     organization_id VARCHAR(25) NOT NULL
--         REFERENCES organization ON DELETE CASCADE

-- );

-- CREATE TABLE favorites(
--     username VARCHAR(25)
--         REFERENCES users ON DELETE CASCADE,
--     pet_id INTEGER
--         REFERENCES pets ON DELETE CASCADE,
--     PRIMARY KEY (username, pet_id)
-- );

-- CREATE TABLE organization(
--     org_id VARCHAR PRIMARY KEY,
--     org_name TEXT NOT NULL,
--     email TEXT NOT NULL,
--     phone VARCHAR NOT NULL,
--     address VARCHAR NOT NULL
-- );
