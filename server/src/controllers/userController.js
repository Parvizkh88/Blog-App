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
            <p>Please click here to <a href="${dev.app.clientUrl}/api/users/activate?token=${token}" target="_blank">activate your account</a> </p>
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

module.exports = {
    registerUser
}