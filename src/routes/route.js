const express = require('express');
const router = express.Router();
const Controller = require ('../controllers/controller')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/test-1", Controller.firstTest)
router.get("/test-2", Controller.secondTest)
router.get("/test-3", Controller.thirdTest)
router.get("/test-4", Controller.fourthTest)

module.exports = router;