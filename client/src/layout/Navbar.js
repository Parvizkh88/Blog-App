import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (

        <nav className='nav'>
            <Link to='/' className='nav__link'>Home</Link>
            <Link to='/blogs' className='nav__link'>Blogs</Link>
            <Link to='/create-blog' className='nav__link'>Create Blog</Link>
            <Link to='/register' className='nav__link'>Register</Link>
            <Link to='/login' className='nav__link'>Login</Link>
            <Link to='/profile' className='nav__link'>Profile</Link>
        </nav>
    )
}

export default Navbar