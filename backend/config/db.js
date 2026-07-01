const mongoose = require('mongoose')

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    } catch (err){
        console.log("MongoDB Connection Failed: ", err.message);
        process.exit(1);
    }
};

module.exports = connectdb;