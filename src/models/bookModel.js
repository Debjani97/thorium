const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema({
    bookName : {
        type : String,
        required : true,
        unique : true
    },
    authorName : {
        type : String,
        required : true
    },
    price :{
        indianPrice : String,
        EuropeanPrice : String
    },
    year : {
        type : Number,
        default : 2021
    },
    totalPages : Number,
    tags : [String],
    stockAvailable : Boolean
}, {timestamps : true})

module.exports = mongoose.model("Book", bookSchema)
//users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
