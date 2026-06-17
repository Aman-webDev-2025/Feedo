const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

//Routes import
const userRoutes = require('./routes/userRoute');

//database 
const connectDb = require('./config/db');
connectDb();

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());

//routes mount
app.use("/api/user" , userRoutes);

//base route
app.get("/" , (req , res)=> {
    res.send("API is running");
})

app.listen(PORT , () => {
    (console.log(`server is running on : http://localhost:${PORT}`))
})