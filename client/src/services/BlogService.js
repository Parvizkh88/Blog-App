import axios from 'axios'
const baseURL = 'http://127.0.0.1:8080';

// How to make a request to backend from frontend 
export const createBlogRequest = async (newBlog) => {
    // How to make a request to backend from frontend 
    const response = await axios.post(`${baseURL}/api/blogs`, newBlog)
    return response.data;
}