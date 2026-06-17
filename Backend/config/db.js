const mongoose = require('mongoose');

const connectDB = async()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb is connected successfully");
    }
    catch(error){
        console.log("error in connectiong with moongodb:" , error.message)
    }
}

module.exports = connectDB;