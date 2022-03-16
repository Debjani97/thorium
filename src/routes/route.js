const express = require('express');
const router = express.Router();
const controller= require("../controllers/controller")
const middleware = require("../middleWare/auth") 


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", controller.createAuthor)
router.post("/createBlog", middleware.authenticate, controller.createBlog)
router.get("/getBlogs", middleware.authenticate, controller.getBlog)
router.put("/blogs/:blogId", middleware.authenticate, middleware.authorize, controller.updateBlog)
router.delete("/deleteBlogs/:blogId", middleware.authenticate, middleware.authorize, controller.deleteById)
router.delete("/deleteBlogs", middleware.authenticate, middleware.authorize,controller.deleteByQuery)
router.post("/login",controller.loginUser)


module.exports = router;
