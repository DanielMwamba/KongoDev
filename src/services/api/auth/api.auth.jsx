import axios from "axios";

export async function registerUser(data){
    try {
        const response = await axios.post(`https://kongodevapi.onrender.com/api/user/register`,data)
        return Promise.resolve(response.data)
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        return Promise.reject({ msg: errorMsg });
    }
}

export async function loginUser(data){
    try {
        const response = await axios.post(`https://kongodevapi.onrender.com/api/user/login`,data)
        return Promise.resolve(response.data)
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        return Promise.reject({ msg: errorMsg });
    }
}
