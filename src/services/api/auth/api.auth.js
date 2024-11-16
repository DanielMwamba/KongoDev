import api from "../../axiosInstance";

export async function registerUser(data) {
  try {
    const response = await api.post(`/user/register`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.msg || "An error occurred during registration");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request");
    }
  }
}

export async function loginUser(data) {
  try {
    const response = await api.post(`/user/login`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || "An error occurred during login");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}