import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


class PetApi{

    static token;
    //sign up for website
    static async register(user){
        try{
            let response = await axios.post(`${BASE_URL}/users/register`,user)
            console.log(response)
            PetApi.token = response.data.token;
            return response.token
        } catch(e){
            console.log(e)
        }
    }

    //get current user
    static async getCurrentUser(username){
        try{
        let response = await axios.get(`${BASE_URL}/users/${username}`,{params:{_token: localStorage.getItem("token")}});
        return response.data.user;
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
            let response = await axios.post(`${BASE_URL}/auth/login`, data);
            // console.log(`login res: ${JSON.stringify(response)}`);
            // console.log(`token in login: ${response.data.token}`);
            PetApi.token = response.data.token;
            localStorage.setItem("token", PetApi.token )
            return response.data.token;
        }catch(e){
            console.log(e)
        }
    }

    //get pet based on type (dog,cat,etc)
    static async petType(type){
        try{
            let response = await axios.get(`${BASE_URL}/pets?`, {params:{type,_token: localStorage.getItem("token")}});
            return response.data
        } catch(e){
            console.log(e)
        }
    }

    //get all types of pets
    static async allPetTypes(){
        try{
            let response = await axios.get(`${BASE_URL}/pets/types`, {params:{_token: localStorage.getItem("token")}})
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    //get info on one type of pet
    static async petTypeInfo(type){
        try{
            let response = await axios.get(`${BASE_URL}/pets/onetype/${type}`,{params:{_token: localStorage.getItem("token")}})
            return response.data.type
        }catch(e){
            console.log(e)
        }
    }

    //get pet based on filters
    static async petFilter(type,breed,gender,age,color,location){
        try{
            let response = await axios.get(`${BASE_URL}/pets/search`, {params: {type,breed,gender,age,color,location,_token: localStorage.getItem("token")}});
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    //get specific pet based on id
    static async getPet(id){
        try{
            let response = await axios.get(`${BASE_URL}/pets/${id}`,{params:{_token: localStorage.getItem("token")}});
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    //create pet favorite
    static async favPet(id,username){
        try{
            let response = await axios.post(`${BASE_URL}/pets/favorite/${id}/${username}`,{params:{_token: localStorage.getItem("token")}});
            return response.data.data
        }catch(e){
            console.log(e)
        }
    }

    //get all favorited pets
    static async getAllFavPets(username){
        try{
            let response = await axios.get(`${BASE_URL}/pets/favorite/${username}`,{params:{_token: localStorage.getItem("token")}});
            return response.data.result
        }catch(e){
            console.log(e)
        }
    }

    //get breeds of specific pet type
    static async petBreed(type){
        try{
            let response = await axios.get(`${BASE_URL}/pets/breeds/${type}`, {params:{_token: localStorage.getItem("token")}})
            return response.data.breeds
        }catch(e){
            console.log(e)
        }
    }

    //get company info of the pet
    static async getCompany(orgId){
        try{
            console.log("FRONTEND API")
            let response = await axios.get(`${BASE_URL}/pets/company/${orgId}`, {params:{_token: localStorage.getItem("token")}});
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    //delete pet based on id
    static async deletePet(id,username){
        console.log("DELETING PET")
        try{
            console.log("before response")
            console.log(id,username)
            let response = await axios.delete(`${BASE_URL}/pets/favorite/${id}/${username}`,{params:{_token: localStorage.getItem("token")}});
            console.log("after response")
            return response
        }catch(e){
            console.log(e)
        }
    }
}

export default PetApi;
