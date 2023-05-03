import axios from 'axios';
// axios with the help of withCredentials will allow us to send
// credentials as headewr authorization
axios.defaults.withCredentials = true
const baseURL = 'http://127.0.0.1:8080';


// we are sendin newBlog
export const registerUser = async (newUser) => {
    // How to make a request to backend from frontend 
    const response = await axios.post(`${baseURL}/api/users/register`, newUser)
    return response.data;
}
