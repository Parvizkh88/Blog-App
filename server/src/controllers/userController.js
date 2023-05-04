const bcrypt = require('bcrypt')
const saltRound = 10;
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const mongoose = require('mongoose');
// const { securePassword, comparePassword } = require("../helpers/bcryptPassword");
// const User = require('../models/users.js');
const User = require('../models/userModel');
const dev = require('../config');
const { sendEmailWithNodeMailer } = require('../helper/sendEmail.js');
const { successHandler } = require('./requestHandler.js');

const registerUser = async (req, res, next) => {
    try {
        // step 1: get the data from request
        const { name, email, password, phone } = req.body;
        const image = req.file;

        // when we are throwing any error the catch will handle it
        //  and catch will call the next middleware
        if (!name || !email || !password || !phone) throw createError(404,
            'name, email, password or phone is missing');

        if (password.length < 6) throw createError(400,
            'password length should be at least 6 characters');


        if (image && image.size > Math.pow(1024 * 1))
            throw createError(400,
                'file is too large. It must be less than 2 mb in size');

        // step 3: check the user already exiswt or not
        const user = await User.findOne({ email });
        if (user) throw createError(
            400,
            'user with this email already exists. Please sign in'
        );

        const hashedPassword = await bcrypt.hash(password, saltRound);
        // step 4: create a token for storing data temporarily
        const token = jwt.sign(
            { ...req.body, password: hashedPassword, image: image.path },
            String(dev.app.jwtActivationSecretKey),
            { expiresIn: '20m' }
        );

        //step 5: prepare email data including jwt token
        const emailData = {
            email,
            subject: "Account Activation Email",
            html: `
            <h2>Hello ${name}! </h2>
            <p>Please click here to <a href="${dev.app.clientUrl}/api/users/activate/${token}" target="_blank">activate your account</a> </p>
            `,
        };
        // step 6: send verification email
        sendEmailWithNodeMailer(emailData);

        return successHandler(res, 200, `Please go to your email: ${email} for completing your registration process`, { token: token });
    } catch (error) {
        // if it is violating the schema error
        if (error.name === 'validationError') {
            next(createError(422, error.message));
            return;
        }
        next(error)
    };
};

const verifyEmail = async (req, res, next) => {
    try {
        // reveiving token in backend from frontend or email after verification
        // step 1 : get token from authorization header
        const token = req.body.token;
        // second way to get token but destructured:
        // const { token } = req.body;

        // check if we get token in backend coming from frontend
        console.log('verify email: ', token);
        // step 2 : check token exists in request body 
        if (!token) {
            return res.status(404).json({
                message: 'token is missing',
            });
        }
        // step 3: verify token and decode data
        const decoded = jwt.verify(token, String(dev.app.jwtActivationSecretKey));

        // step 4: check if email is already registered
        const existingUser = await User.findOne({ email: decoded.email });
        if (existingUser)
            return res.status(409).send({
                success: false,
                error: 'This account is already activated',
            });

        // step 5: create the user  - when we verify the user everything is inside decode
        const newUser = new User({ ...decoded })
        // console.log(newUser);
        // create the user with image

        // step 6: save the user in the database
        const user = await newUser.save();

        // step 7: send the response
        if (!user) throw createError(400, 'user was not created');

        return successHandler(res, 201,
            'user was created successfully! Please signin');

    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser, verifyEmail
}