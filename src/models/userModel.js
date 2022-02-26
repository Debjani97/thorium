const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String,
    authorName: String,
    category: String,
    year: Number,
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    // emailId: String,
    // gender: {
    //     type: String,
    //     enum: ["male", "female", "LGBTQ"]
    // },
    // age: Number,

}, { timestamps: true });

module.exports = mongoose.model('User', bookSchema) //users