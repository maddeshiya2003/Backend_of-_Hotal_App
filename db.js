const mongoose = require('mongoose');

// To define url for database 
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongoURL)

// ye line isliye use kr rhe hai kyuki ye mongodb server aur nodejs ka server ke bich connection stablish krta hai 
// ye ek connection object hota hai 
const db = mongoose.connection;

// define some event listners of mongo db

db.on("connected", () => {
    console.log("DATABASE CONNECTED")
})

db.on("error", (err) => {
    console.log("SOME ERROR OCCURE", err)
})

db.on("disconnected", () => {
    console.log("DATABASE DISCONNECTED")
})

// export this for access in server.js file

module.export = db;