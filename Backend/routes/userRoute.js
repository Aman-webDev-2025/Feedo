const express = require('express');

const {registerUser , loginUser , getUserProfile} = require('../controllers/userController');
const authUser = require('../middleware/authMiddleware');

const userRoute = express.Router();

userRoute.post('/register' , registerUser);
userRoute.post('/login' , loginUser)

userRoute.get('/profile' , authUser , getUserProfile)

module.exports = userRoute;