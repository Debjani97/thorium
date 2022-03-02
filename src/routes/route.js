const express = require('express');
const router = express.Router();

const authorController = require("../controller/authorController")
const bookController = require("../controller/bookController")
const publisherController = require("../controller/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post("/createPublisher", publisherController.createPublisher)
router.post("/createBook", bookController.createBook  )
router.get("/getBooks", bookController.getBooks)

module.exports = router