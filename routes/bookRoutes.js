const express = require("express")
const router = express.Router()
const BookModel = require("../models/bookModel.js")

router.post("/", async (req, res) => {
    try {
        const { title, author, category } = req.body;

        if (!title || title.trim() === "" || !author || author.trim() === "" || !category || category.trim() === "") {
            return res.status(400).json({
                message: "Please provide all the details",
                data: null
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
    catch (error) {
        console.error(`Error while adding:${error.message}`)
        return res.status(500).json({
            message: "Internal Server Error",
            data: null
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const { page, limit } = req.query
        const sanitizedPage = parseInt(page, 10) < 0 ? 1 : parseInt(page, 10) || 1
        const sanitizedLimit = parseInt(limit, 10) < 0 ? 10 : parseInt(limit, 10) || 10
        const skip = (sanitizedPage - 1) * sanitizedLimit

        const books = BookModel.find().skip(skip).limit(sanitizedLimit)

        if (books.length === 0) {
            return res.status(404).json({
                message: "Books not found",
                data: null
            })
        }

        return res.status(200).json({
            message: "Books found",
            data: books
        })
    } catch (error) {
        console.error(`Error while fetching:${error.message}`)
        return res.status(500).json({
            message: "Internal Server Error",
            data: null
        })
    }

})

router.patch("/:id", async (req, res) => {
    try {
        const { status } = req.body
        if (!status || status.trim() === "" || status.isBoolean() === false) {
            return res.status(400).json({
                message: "Provide the correct status",
                data: null
            })
        }
        const { id } = req.params
        if(!id || id.trim() === "" || Mongo.Types.ObjectId.isValid(id) === false){
            return res.status(400).json({
                message: "Provide valid Id",
                data: null
            })
        }

        const updatedBook = await BookModel.findByIdAndUpdate(id, {availabilityStatus: status})
        if(!updatedBook){
            return res.status(404).json({
                message: "Book not found for updation",
                data:null
            })
        }
        return res.status(200).json({
            message: "Book patched successfully",
            data: updatedBook
        })

    } catch (error) {
        console.error(`Error while patching:${error.message}`)
        return res.status(500).json({
            message: "Internal Server Error",
            data: null
        })
    }

})