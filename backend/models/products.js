const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add product title']
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: String,
    userId: String,
    company: String
})

module.exports = mongoose.model("Products", productSchema);