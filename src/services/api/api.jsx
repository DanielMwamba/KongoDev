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

export async function getUserByUsername(username) {
  try {
    const response = await axios.get(`https://kongodevapi.onrender.com/api/user/username/${username}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export async function updateUser(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`https://kongodevapi.onrender.com/api/user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function refreshToken(refreshToken) {
  try {
    const response = await axios.post(`https://kongodevapi.onrender.com/api/user/refreshToken`,{refreshToken});
    return response.data;
  } catch (err) {
    console.log(err);
  }
}




// BLOG POST APIs
export async function getAllPosts() {
    try {
      const response = await axios.get(`https://kongodevapi.onrender.com/api/post`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  export async function addPost(data) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`https://kongodevapi.onrender.com/api/post`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      return Promise.reject({ msg: errorMsg });
    }
  }


  export async function updatePost(post_id, data) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`https://kongodevapi.onrender.com/api/post/${post_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      return Promise.reject({ msg: errorMsg });
    }
  }

  export async function deletePost(post_id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://kongodevapi.onrender.com/api/post/${post_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      return Promise.reject({ msg: errorMsg });
    }
  }


  export async function getUserPosts() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://kongodevapi.onrender.com/api/post/user-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      return Promise.reject({ msg: errorMsg });
    }
  }

  export async function getPost(slug) {
    try {
      const response = await axios.get(`https://kongodevapi.onrender.com/api/post/slug/${slug}`);

      return Promise.resolve(response.data);
    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      return Promise.reject({ msg: errorMsg });
    }
  }

  export async function getPostsByCategory(category) {
    try {
      const response = await axios.get(`https://kongodevapi.onrender.com/api/post/category/${category}`)

      return Promise.resolve(response.data);
    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      return Promise.reject({ msg: errorMsg });
    }
  }