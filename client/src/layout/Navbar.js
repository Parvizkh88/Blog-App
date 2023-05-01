import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (

        <nav className='nav'>
            <Link to='/' className='nav__link'>Home</Link>
            <Link to='/blogs' className='nav__link'>Blogs</Link>
            <Link to='/create-blog' className='nav__link'>Create Blog</Link>
        </nav>
    )
}

export default Navbar