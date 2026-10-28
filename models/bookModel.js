const mongoose = require("mongoose")

const Book = new mongoose.Schema({
    title:{
        Type: String,
        required:true,
        trim: true,
    },
    author:{
        Type: String,
        required: true,
        trim: true,
    },
    category:{
        Type: String,
        required: true,
        trim: true,
    }
})

const BookModel = mongoose.model("Book",Book)
module.exports = BookModel