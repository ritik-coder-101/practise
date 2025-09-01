const mongoose=require('mongoose');
require('dotenv').config();

const connectDB = async () =>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to mongoDB ${conn.connection.host} ...`);
    } catch (err) {
        console.log(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB