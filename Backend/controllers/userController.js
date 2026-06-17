const userModel = require('../models/userModel');

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

        const user = await userModel.create({
            name,
            email,
            password,
            phone
        });

        return res.status(201).json({
            success: true,
            message: "user registered successfully",
            user
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "user registeration failed"
        })
    }
}