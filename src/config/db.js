const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed");
    }
};

module.exports = connectDB;
