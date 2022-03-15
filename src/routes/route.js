const express = require('express');
const router = express.Router();
const controller= require("../controllers/controller")
const middleware = require("../middleWare/auth") 


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", controller.createAuthor)
router.post("/createBlog", middleware.authenticate, middleware.authorize, controller.createBlog)
router.get("/getBlogs", middleware.authenticate, middleware.authorize, controller.getBlog)
router.put("/blogs/:blogId", middleware.authenticate, middleware.authorize, controller.updateBlog)
router.delete("/deleteBlogs/:blogId", middleware.authenticate, middleware.authorize, controller.deleteById)
router.delete("/deleteBlogs", middleware.authenticate, middleware.authorize,controller.deleteByQuery)
// router.post("/createBlog", middleware.authentication, middleware.authorization, controller.createBlog)
// router.get("/getBlogs", middleware.authentication, middleware.authorization, controller.getBlog)
// router.put("/blogs/:blogId", middleware.authentication, middleware.authorization, controller.updateBlog)
// router.delete("/deleteBlogs/:blogId", middleware.authentication, middleware.authorization, controller.deleteById)
// router.delete("/deleteBlogs", middleware.authentication, middleware.authorization,controller.deleteByQuery)
router.post("/login",controller.loginUser)


module.exports = router;