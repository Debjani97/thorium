const mongoose = require('mongoose');
// const moment = require("moment")
const ObjectId = mongoose.Schema.Types.ObjectId
const book = new mongoose.Schema({

    title: {
        type: String,
        required:[ true, "Title is required"],
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: [ true,"Excerpts is required"],
        trim: true 
    },
    userId: {
        type: ObjectId,
        required:[ true, "userId is required"],
        ref: 'userModel',
        trim: true
    },
    ISBN: {
        type: String,
        required:[ true, "ISBN is required"],
        unique: true,
        trim: true 
    },
    category: {
        type: String,
        required: [true, "category is required"],
        trim: true 
    },
    subcategory: {
        type: String,
        required: [ true, "Subcategory is required"],
        trim: true 
    },
    reviews: {
        type: Number,
        default: 0,
        comment: {
            type:Number
        }
    },
    bookCover:{
        type: String,
        unique: true
    },
    deletedAt: {
        type: Date 
    },
    isDeleted: {
        type: Boolean,
        default: false 
    },
    releasedAt: {
        type: Date,
        required:[ true, "Released date is required"],
        trim: true,
        format:("YYYY-MM-DD") 
    },
}, { timestamps: true })

module.exports = mongoose.model('booksModel', book)