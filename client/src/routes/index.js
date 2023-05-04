import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from '../layout/Navbar';
import Blogs from '../pages/Blogs';
import CreateBlog from '../pages/CreateBlog';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Activate from '../pages/Activate';

const Index = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/create-blog' element={<CreateBlog />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/api/users/activate/:token' element={<Activate />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index