const express = require('express');
const app = express();
const db = require("./db");
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('./auth');


const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const logRequest = (req,res,next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to '${req.originalUrl}'`)
  next();
}

app.use(logRequest);

app.use(passport.initialize()); //authenticate any request that come form user

const localAuthMiddleware = passport.authenticate("local",{session:false}) ; // by which stretegy the user is authenticated

// app.use(localAuthMiddleware); // pass in middleware for any request from user

app.get('/', function (req, res) {
  res.send('Welcome To Our Hotal !!')
})

// routes for person
const personRoute = require("./routes/personRoute");
app.use("/person" , personRoute)

// routes for menu
const menuRoute = require("./routes/menuRoute");
app.use("/menu",menuRoute)

app.listen(PORT,() => {
  console.log("Listing at port 3000")
});