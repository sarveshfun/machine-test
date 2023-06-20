const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const ejs = require('ejs');
const path = require("path");
const mime = require('mime-types');
const router = require("./router/router.js")
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public",express.static('public'));

app.use("/categories",router);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




