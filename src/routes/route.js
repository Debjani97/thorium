const express = require('express');
const router = express.Router();
const controller= require("../controllers/controller")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", controller.createAuthor)
router.post("/createBlog", controller.createBlog)
router.get("/getBlogs", controller.getBlog)
router.put("/blogs/:blogId", controller.updateBlog)
router.delete("/deleteBlogs/:blogId", controller.deleteById)
router.delete("/deleteBlogs",controller.deleteByQuery)


module.exports = router;