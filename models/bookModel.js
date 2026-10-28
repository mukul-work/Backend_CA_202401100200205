const mongoose = require("mongoose")

const Book = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    availabilityStatus: {
        type: Boolean,
        default: false,
        required: true,
    }
},
    { timestamps: true })

const BookModel = mongoose.model("Book", Book)
module.exports = BookModel