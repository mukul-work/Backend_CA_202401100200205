const express = require("express")
const router = express.Router()
const BookModel = require("../models/bookModel.js")

router.post("/", async (req, res) => {
    try {
        const { title, author, category } = req.body;

        if (!title || title.trim() === "" || !author || author.trim() === "" || !category || category.trim() === "") {
            return res.status(400).json({
                message: "Please provide all the details",
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
        })

    }
    catch (error) {
        console.error(`Error while adding:${error.message}`)
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const { page, limit } = req.query
        const sanitizedPage = parseInt(page, 10) < 0 ? 1 : parseInt(page, 10) || 1
        const sanitizedLimit = parseInt(limit, 10) < 0 ? 10 : parseInt(limit, 10) || 10
        const skip = (sanitizedPage - 1) * sanitizedLimit

        const books = await BookModel.find().skip(skip).limit(sanitizedLimit)

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
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Provide a valid ID"
            });
        }

        if (typeof status !== "boolean") {
            return res.status(400).json({
                message: "Status must be a boolean"
            });
        }

        const updatedBook = await BookModel.findByIdAndUpdate(id, { availabilityStatus: status }, { new: true, runValidators: true });

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found for updation"
            });
        }

        return res.status(200).json({
            message: "Book patched successfully",
            data: updatedBook
        });

    } catch (error) {
        console.error("Error while patching:", error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = router;
