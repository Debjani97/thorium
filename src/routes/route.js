const express = require('express');
const router = express.Router();
const usercontroller= require("../controllers/userController")
const bookcontroller= require("../controllers/bookController")
const reviewcontroller = require("../controllers/reviewController")
const middleware = require("../middleWare/auth") 


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", usercontroller.createUser)
router.post("/loginUser", usercontroller.loginUser)


router.post("/createBook", middleware.auth, bookcontroller.createBook)
router.get("/getBook", middleware.auth, bookcontroller.getBook)
router.get("/getBookById/:bookId", middleware.auth, bookcontroller.getBookById)
router.put("/updateBook", middleware.auth, bookcontroller.updateBook)
router.delete("/deleteBook/:bookId", middleware.auth,bookcontroller.deleteBookId)


router.post("/books/:bookId/review", reviewcontroller.updateReview)
router.put("/books/:bookId/review/:reviewId", reviewcontroller.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviewcontroller.deleteReview)




module.exports = router;