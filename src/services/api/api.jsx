import axios from "axios";

//USER APIs
export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`https://kongodevapi.onrender.com/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    return console.log(error.message);
  }
}




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