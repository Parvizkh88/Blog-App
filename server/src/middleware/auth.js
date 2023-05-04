const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const dev = require('../config');
const User = require('../models/userModel');

// this page is to check if the user has an authority to access a certain
// page such as profile or card ...
const isLoggedIn = (req, res, next) => {
    try {
        // cookie here
        if (!req.headers.cookie) {
            return res.status(404).send({
                message: 'No cookie found'
            })
        }
        // token inside the cookie - extract the token
        const token = req.headers.cookie.split('=')[1]
        // console.log(token);
        // token exists or not
        if (!token) {
            return res.status(404).send({
                message: 'No token found'
            });
        }
        // now that the token exists we must verify it
        const decoded = jwt.verify(
            // we also pass the token
            token,
            // this is the key to create and verify the token
            String(dev.app.jwtAuthorizationSecretKey),
        );
        if (!decoded) throw createError(403, 'Invalid Token');
        // if decoded is not null we set the request id to decoded id(token)
        req._id = decoded._id;
        next();
    } catch (error) {
        next(error);
    }
};

const isLoggedOut = (req, res, next) => {
    try {
        if (req.headers.cookie) { // user is logged in
            throw createError(401, 'not possible to process the request until you log out')
        }
        //the user is allowed to proceed with the request because they are not logged in,
        // and the next middleware function will handle the request as intended.
        next();
        // if the user is not logged in
    } catch (error) {
        next(error);
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const id = req._id;
        if (id) {
            const user = await User.findById(id);
            if (!user) throw createError(404, 'No user found with this id');

            // check if user is admin
            if (!user.isAdmin) throw createError(401, 'user is not an admin');
            next()
        } else {
            throw createError(400, 'please login!')
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = { isLoggedIn, isLoggedOut, isAdmin }