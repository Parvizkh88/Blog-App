const { registerUser } = require('../controllers/userController');
const upload = require('../middleware/fileUpload');

const userRouter = require('express').Router();

userRouter.post('/register', upload.single('image'), registerUser);
// userRouter.post('/verify-email', verifyEmail);
// userRouter.post('/login', isLoggedOut, loginUser);
// userRouter.get('/logout', isLoggedIn, logoutUser);
// userRouter
//     .route('/')
//     .get(isLoggedIn, userProfile)
//     .delete(isLoggedIn, deleteUser)
//     .put(isLoggedIn, upload.single('image'), updateUser);
// userRouter.post('/forget-password', isLoggedOut, forgetPassword);
// userRouter.post('/reset-password', isLoggedOut, resetPassword);

userRouter.get('*', (req, res) => {
    res.status(404).json({
        message: '404 not found'
    });
});

module.exports = userRouter;