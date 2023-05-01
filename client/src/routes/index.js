import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Blogs from '../pages/Blogs'
import CreateBlog from '../pages/CreateBlog'
import Home from '../pages/Home'

const Index = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/create-blog' element={<CreateBlog />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index