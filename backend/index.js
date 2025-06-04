const path = require("path");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db");

// Load config file
dotenv.config({ path: "./config/config.env" });

// Route files
const users = require("../backend/routes/user");
const products = require("../backend/routes/products");

connectDB();

const app = express();


//Body Parser

app.use(express.json());
app.use(cors());
// Mount routes
app.use('/api/v1/users', users);
app.use('/api/v1/products', products);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server runing in ${process.env.NODE_ENV} mode on post ${PORT}`));