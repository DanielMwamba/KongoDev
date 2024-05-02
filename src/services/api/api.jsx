import axios from "axios";


// BLOG POST APIs
export async function getAllPosts() {
    try {
      const response = await axios.get(`https://kongodevapi.onrender.com/api/post`);
      return response.data;
    } catch (err) {
      console.log(
        `Error while Fetching Particular User Data using GET API Method : ${err}`
      );
    }
  }