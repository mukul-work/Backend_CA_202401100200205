require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./db/db.js")
const bookRoutes = require("./routes/bookRoutes.js");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/books", bookRoutes);
async function startServer(){
    try{
        await connectDb();

        app.listen(PORT,()=>{
            console.log(`Server on ${PORT}`);
        })
    }catch(error){
        console.error(`Error while starting server: ${error.message}`);
        process.exit(1);
    }
}

startServer();
