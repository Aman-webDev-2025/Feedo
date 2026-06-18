const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id)=> {
    return jwt.sign({ id } , process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
}

//user registration
exports.registerUser = async(req , res)=> {
    try{
        const {name , email , password , phone} = req.body;
        
        if(!name || !email || !password || !phone){
            return res.status(400).json("please enter all required details");
        }

        const userExists = await userModel.findOne({email});
        
        if(userExists){
            return res.status(400).json("user already exists with this mail. Please try another email");
        }

        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password , salt);

        const user = await userModel.create({
            name,
            email,
            password: hassedPassword,
            phone
        });

        const token = createToken(user._id);

        return res.status(201).json({
            success: true,
            message: "user registered successfully",
            user,
            token
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "user registeration failed. Please try again later"
        })
    }
}


//user login
exports.loginUser = async (req , res)=> {
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json("Please enter email and password");
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json("Please enter valid email");
        }

        const matchPassword = await bcrypt.compare(password , user.password);
        if(!matchPassword){
            return res.status(400).json("please enter correct password");
        }

        const token = createToken(user._id);

        return res.status(200).json({
            success: true,
            message: "user login successfully",
            user,
            token
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Login is failed. Please try again later"
        })
    }
}


//user profile
exports.getUserProfile = async( req , res)=>{
    try{
        const user = await userModel.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            user
        })
    }
    catch(error){
        res.status(500).json("Cant fetch profile right now. Please try again later");
    }
}