const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController");
const WeatherController= require("../controllers/weatherController")




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALsessionByDistrictIdL THE "vaccination sessions by district id" for any given district id and for any given date
router.get("/cowin/getByDistrictId", CowinController.sessionByDistrictId)
router.post("/meme/chat",CowinController.memeChat);
router.get("/getCities", WeatherController.getCities)


module.exports = router;