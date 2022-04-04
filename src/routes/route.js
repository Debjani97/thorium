const express = require('express');
const router = express.Router();
const usercontroller= require("../controllers/userController")
const bookcontroller= require("../controllers/bookController")
const reviewcontroller = require("../controllers/reviewController")
const middleware = require("../middleWare/auth") 


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: "AKIAY3L35MCRVFM24Q7U",  // id
  secretAccessKey: "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",  // secret password
  region: "ap-south-1" 
});



let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) { 
    
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });

    var uploadParams = {
      ACL: "public-read", 
      Bucket: "classroom-training-bucket", 
      Key: "suraj/" + file.originalname,    
      Body: file.buffer, 
    };

    s3.upload(uploadParams , function (err, data) {
      if (err) {
        return reject( { "error": err });
      }
    //   console.log(data)
    //   console.log("File uploaded successfully.");
      return resolve(data.Location);  
    });
  });
};

router.post("/write-file-aws", async function (req, res) {
  try {
    let files = req.files;
    if (files && files.length > 0) {
      let uploadedFileURL = await uploadFile( files[0] );  
      res.status(201).send({ status: true,msg: "file uploaded succesfully", data: uploadedFileURL });

    } 
    else {
      res.status(400).send({ status: false, msg: "No file to write" });
    }

  } 
  catch (err) {
    console.log("error is: ", err);
    res.status(500).send({ status: false, msg: "Error in uploading file" });
  }

});



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