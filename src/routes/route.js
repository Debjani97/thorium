const express = require('express');
const { param } = require('express/lib/request');
const router = express.Router();
const userController= require("../controllers/userController")
const MiddleWare = require('../middleware/auth')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",MiddleWare.authentication, MiddleWare.authorization, userController.getUserData)
router.post("/users/:userId/posts",MiddleWare.authentication, MiddleWare.authorization, userController.postMessage)

router.put("/users/:userId",MiddleWare.authentication, MiddleWare.authorization, userController.updateUser)
router.delete('/users/:userId',MiddleWare.authentication, MiddleWare.authorization, userController.deleteUser)

module.exports = router;