import api from "../axiosInstance";

/**
 * Handles API errors and returns a standardized error object
 * @param {Error} error - The error object from the API call
 * @param {string} defaultMessage - Default error message
 * @returns {Object} Standardized error object
 */
const handleApiError = (error, defaultMessage) => {
  if (error.response) {
    return {
      message: error.response.data.msg || defaultMessage,
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    return {
      message: "No response received from server",
      status: 0,
      data: null,
    };
  } else {
    return {
      message: "Error setting up the request",
      status: 0,
      data: null,
    };
  }
};

// User APIs
/**
 * Get current user's information
 * @returns {Promise<Object>} User data
 */
export const getUser = async () => {
  try {
    const response = await api.get("/user");
    return response.data.user;
  } catch (error) {
    throw handleApiError(error, "Failed to get user information");
  }
};

/**
 * Get user by username
 * @param {string} username - Username to fetch
 * @returns {Promise<Object>} User data
 */
export const getUserByUsername = async (username) => {
  try {
    const response = await api.get(`/user/username/${username}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to get user by username");
  }
};

/**
 * Update user information
 * @param {Object} data - User data to update
 * @returns {Promise<Object>} Updated user data
 */
export const updateUser = async (data) => {
  try {
    const response = await api.put(`/user`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to update user information");
  }
};

/**
 * Update profile picture
 * @param {string} file - File to upload
 * @returns {Promise<Object>} Updated user data
 */
export const updateProfilePicture = async (file) => {
  try {
    const response = await api.put(`/user/profileImage`, { file });
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to update profile picture");
  }
};

/**
 * Reset password
 * @param {string}  currentPassword - Current user password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} New token data - Email of the user
 */
export const resetPassword = async (newPassword, currentPassword) => {
  try {
    const response = await api.put(`/user/password`, {
      newPassword,
      currentPassword,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to reset password");
  }
};

/**
 * Refresh user token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} New token data
 */
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post(`/user/refreshToken`, { refreshToken });
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to refresh token");
  }
};

// Blog Post APIs
/**
 * Get all posts
 * @returns {Promise<Object>} All posts data
 */
export const getAllPosts = async () => {
  try {
    const response = await api.get(`/post`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to get all posts");
  }
};

/**
 * Add a new post
 * @param {Object} data - Post data
 * @returns {Promise<Object>} Created post data
 */
export const addPost = async (data) => {
  try {
    const response = await api.post(`/post`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to add post");
  }
};

/**
 * Update a post
 * @param {string} post_id - ID of the post to update
 * @param {Object} data - Updated post data
 * @returns {Promise<Object>} Updated post data
 */
export const updatePost = async (post_id, data) => {
  try {
    const response = await api.put(`/post/${post_id}`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to update post");
  }
};

/**
 * Delete a post
 * @param {string} post_id - ID of the post to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deletePost = async (post_id) => {
  try {
    const response = await api.delete(`/post/${post_id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to delete post");
  }
};

/**
 * Get all posts for the current user
 * @returns {Promise<Object>} User's posts data
 */
export const getUserPosts = async () => {
  try {
    const response = await api.get(`/post/user-all`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to get user posts");
  }
};

/**
 * Get a specific post by slug
 * @param {string} slug - Slug of the post to fetch
 * @returns {Promise<Object>} Post data
 */
export const getPost = async (slug) => {
  try {
    const response = await api.get(`/post/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to get post");
  }
};

/**
 * Get posts by category
 * @param {string} category - Category to fetch posts for
 * @returns {Promise<Object>} Posts data for the category
 */
export const getPostsByCategory = async (category) => {
  try {
    const response = await api.get(`/post/category/${category}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to get posts by category");
  }
};

// Comment APIs
/**
 * Get all comments
 * @returns {Promise<Object>} All comments data
 */
export const getAllComments = async () => {
  try {
    const response = await api.get(`/comment`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to get all comments");
  }
};

///Add a new comment

export const addComment = async (slug, commentData) => {
  try {
    const response = await api.post(`/comment/${slug}`, commentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Failed to add comment");
  }
};
