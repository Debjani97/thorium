const express = require('express');
const router = express.Router();
const BookController = require("../controllers/bookController.js")

router.post("/createBook", BookController.createBook);
router.get("/bookList", BookController.bookList);
router.post("/getBooksInYear",BookController.getBooksInYear);
// router.post("/getParticularBooks",BookController.getParticularBooks)
// router.get("/getXINRBooks", BookController.getXINRBooks);
  
module.exports = router;