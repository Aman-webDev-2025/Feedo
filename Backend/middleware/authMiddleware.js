const jwt = require('jsonwebtoken');

const authUser = (req , res , next)=>{
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        req.userId = decoded.id;

        next();
    }
    catch(error){
        return res.status(500).json({
            success: flase,
            message: "Error , please try again later"
        })
    }
}

module.exports = authUser;