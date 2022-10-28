import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


class PetApi{

    static token;
    //sign up for website
    static async register(user){
        try{
            let response = await axios.post(`${BASE_URL}/users/register`,user)
            return response.token
        } catch(e){
            console.log(e)
        }
    }

    //get current user
    static async getCurrentUser(username){
        try{
        let response = await axios.get(`${BASE_URL}/users/${username}`);
        return response.user;
        } catch(e){
            console.log(e)
        }
    }

    //delete user based on username
    static async deleteUser(username){
        try{
            let response = await axios.delete(`${BASE_URL}/users/${username}/delete`);
        }catch(e){
            console.log(e)
        }
    }

    //login to website
    static async login(data){
        try{
        let response =await axios.post(`${BASE_URL}/auth/login`, data);
        return response.token;
        }catch(e){
            console.log(e)
        }
    }

    //get pet based on type (dog,cat,etc)
    static async petType(type){
        try{
            let response = await axios.get(`${BASE_URL}/pets`, {type});
            return response.data
        } catch(e){
            console.log(e)
        }
    }

    //get pet based on filters
    static async petFilter(breed,gender,age,color,location){
        try{
            console.log("MOSHISMOHI")
            let response = await axios.get(`${BASE_URL}/pets/search`, {breed,gender,age,color,location});
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    //get specific pet based on id
    static async getPet(id){
        try{
            let response = await axios.get(`${BASE_URL}/pets/${id}`);
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    //create pet favorite
    static async favPet(id){
        try{
            let response = await axios.post(`${BASE_URL}/pets/favorite/${id}`);
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    //delete pet based on id
    static async deletePet(id){
        try{
            let response = await axios.get(`${BASE_URL}/pets/favorite/${id}`);
        }catch(e){
            console.log(e)
        }
    }
}

export default PetApi;
