const express = require("express")
const router = express.Router()
const BookModel = require("../models/bookModel.js")

router.get("/", async(req,res)=>{
    try{
        const {title, author, category} = req.body;

        if(!title || title.trim() === "" || !author || author.trim()=== "" || !category || category.trim() === "" ){
            return res.status(400).json({
                message: "Please provide all the details"
            })
        }

        const newBook = BookModel.create({
            title: title,
            author: author,
            category: category,
            availabilityStatus: true,
            createdAt: new Date()
        })

        return res.status(201).json({
            message: "Book added",
            data: newBook
        })

    }
    catch(error){
        console.error(`Error while adding:${error.message}`)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})