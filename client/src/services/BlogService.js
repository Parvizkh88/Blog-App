import axios from 'axios'
const baseURL = 'http://127.0.0.1:8080';


// we are sendin newBlog
export const createBlogRequest = async (newBlog) => {
    // How to make a request to backend from frontend 
    const response = await axios.post(`${baseURL}/api/blogs`, newBlog)
    return response.data;
}

// we are not sending anything. Because it is get request
export const getAllBlogsRequest = async () => {
    // How to make a request to backend from frontend 
    const response = await axios.get(`${baseURL}/api/blogs`)
    return response.data;
}