const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill up the name']
    },
    email: {
        type: String,
        required: [true, 'Please fill up the email'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add valid eamil']
    },
    password: {
        type: String,
        required: [true, 'Please fill up the password']
    }
});

module.exports = mongoose.model('user', userSchema);