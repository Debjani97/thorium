const express = require('express');
const router = express.Router();

const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/createBook", BookController.createBook  )

router.get("/bookList", BookController.getBookList)

router.post("/booksInYear",BookController.booksYear)

router.get("/paticularBooks",BookController.getPaticularBooks)

router.get("/INRBooks", BookController.getInrBooks)

router.get("/randomBooks",BookController.getRandomBooks)

module.exports = router;