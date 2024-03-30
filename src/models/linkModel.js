const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, "Please provide a original URL"],
        trim: true,
    },
    redirectCode: {
        type: Number,
        trim: true,
    },
    shortUrl: {
        type: String,
        trim: true,
    },
    clickCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
