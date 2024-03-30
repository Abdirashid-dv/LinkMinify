const dotenv = require("dotenv");

dotenv.config();

exports.DATABASE = process.env.DATABASE;
exports.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
