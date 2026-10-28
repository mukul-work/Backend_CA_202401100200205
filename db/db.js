const mongoose = require("mongoose")

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully")

    } catch (error) {
        console.error(`Database error: ${error.message}`)
        throw new error
    }
}

module.exports = connectMongoDB;