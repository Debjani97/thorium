const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher

    //validation a
    if(!authorId) return res.send('Author details are required.')

    //validation b
    let author = await authorModel.findById(authorId)
    if(!author) return res.send('No author is present with the given author id')

    //validation c
    if(!publisherId) return res.send('Publisher details are required.') 

    //validation d
    let publisher = await publisherModel.findById(publisherId)
    if(!publisher) return res.send('No publisher is present with the given publisher id')

    let bookCreated = await bookModel.create(book)
    return res.send({data: bookCreated})
}

const getBooks= async function (req, res) {
    let books = await bookModel.find().populate('author publisher')
    res.send({data: books})
}


const updateHardCover = async function (req, res){

    let data = req.body

    let books = await bookModel.find().populate("publisher")

        
    let booksByPublisher = books.filter(ele => (ele.publisher.name == "Penguin") || (ele.publisher.name == "HarperCollins")) 

    let booksName = booksByPublisher.map(x => x.name)
    // console.log(booksName)

    let updatedCover = []

    for (let i=0; i<booksName.length;  i++){
        let element = booksName[i]
        let updateData = await bookModel.findOneAndUpdate({name : element}, {$set : data}, {new : true})
        updatedCover.push(updateData)
    }
    res.send({updatedCover : updatedCover})

        

}


const updatePrice = async function (req,res) {

   

    let books = await bookModel.find().populate("author")

    let authorsRating = books.filter(ele => (ele.author.rating >= 3.5))
    
    let booksName = authorsRating.map(x => x.name)
    // console.log(booksName)
    let updatedPrice = []

    for (let i=0; i<booksName.length;  i++){
        let element = booksName[i]
        let updateData = await bookModel.findOneAndUpdate({name : element}, {$inc : {price : +10}}, {new : true})
        updatedPrice.push(updateData)
    }
    res.send({updatedPrice : updatedPrice})
    
    
   }




module.exports.createBook= createBook
module.exports.getBooks= getBooks
module.exports.updateHardCover = updateHardCover
module.exports.updatePrice = updatePrice