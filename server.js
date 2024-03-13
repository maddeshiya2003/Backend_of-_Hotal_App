const express = require('express');
const app = express();
const db = require("./db");
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Welcome To Our Hotal !!')
})

const personRoute = require("./routes/personRoute");
app.use("/person",personRoute)

const menuRoute = require("./routes/menuRoute");
app.use("/menu",menuRoute)

app.listen(PORT,() => {
  console.log("Listing at port 3000")
});