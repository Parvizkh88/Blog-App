import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { registerUser } from '../services/UserService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value)
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0])
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // we use JavaScript multipart form to upload data that has image
    try {
      const newUser = new FormData();
      newUser.append('name', name);
      newUser.append('email', email);
      newUser.append('password', password);
      newUser.append('phone', phone);
      newUser.append('image', image);
      // for (const [key, value] of newBlog) {
      //     console.log(key, value);
      // }

      // How to make a request to backend from frontend 
      const response = await registerUser(newUser)
      // console.log(response);
      toast.success(response.message);

      // setTitle('');
      // setDescription('');
      // setImage('');
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error.message);
    }
  }

  return (
    <div>
      <h1>User Registeration</h1>
      {/* photo preview and get photo */}
      {image && (
        <div>
          <img className='blog-img' src={URL.createObjectURL(image)} alt="blog" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" name='name' id='name' value={name}
            onChange={handleNameChange} required />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" name='email' id='email' value={email}
            onChange={handleEmailChange} required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="text" name='password' id='password' value={password}
            onChange={handlePasswordChange} required />
        </div>
        <div className="form-control">
          <label htmlFor="phone">Phone</label>
          <input type="text" name='phone' id='phone' value={phone}
            onChange={handlePhoneChange} required />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <input type="file" name='image' onChange={handleImageChange}
            // we accept any image format
            accept='image/*' required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
export default Register;