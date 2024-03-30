const mongoose = require("mongoose");
const config = require("./config");

const DB = config.DATABASE.replace("<PASSWORD>", config.DATABASE_PASSWORD);

const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed");
    }
};

module.exports = connectDB;
