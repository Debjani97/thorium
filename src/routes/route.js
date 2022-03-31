const express = require('express');
const router = express.Router();
const usercontroller= require("../controllers/userController")
const bookcontroller= require("../controllers/bookController")
const reviewcontroller = require("../controllers/reviewController")
const middleware = require("../middleWare/auth") 


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//user_controller_rout......................................................

router.post("/register", usercontroller.createUser)
router.post("/login", usercontroller.loginUser)

//book_controller_rout......................................................

router.post("/books", middleware.auth, bookcontroller.createBook)
router.get("/books", middleware.auth, bookcontroller.getBook)
router.get("/books/:bookId", middleware.auth, bookcontroller.getBookById)
router.put("/books/:bookId", middleware.auth, bookcontroller.updateBook)
router.delete("/books/:bookId", middleware.auth,bookcontroller.deleteBookId)

//review_controller_rout......................................................

router.post("/books/:bookId/review", reviewcontroller.createReview)
router.put("/books/:bookId/review/:reviewId", reviewcontroller.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviewcontroller.deleteReview)


module.exports = router;