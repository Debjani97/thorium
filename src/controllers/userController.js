const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
let validator =require("email-validator");

const createUser = async function (req, res) {
    try{
       let user = req.body
       if (Object.entries(user).length === 0) {
       return res.status(400).send({ status: false, msg: "Kindly pass some data " })
      }
else {
     let email = req.body.email
     if(!email)
     return res.status(400).send({status: false,msg:"Enter Valid Email"})

     let check = validator.validate(email);
     if (!check) {
          return res.status(401).send({ status: false, msg: "Enter a valid email id" }) } 

     let mail = await userModel.findOne({ email })
     if (mail) {
          return res.status(401).send({ status: false, msg: "Enter Unique Email Id." })}

     let userCreated = await userModel.create(user)
     res.status(201).send({ status: true, data: userCreated })
}
}
catch (error) {
console.log(error)
res.status(500).send({ status: false, msg: error.message })
}

};

  
const loginUser = async function (req, res) {
    try {
       let data = req.body;
       if (Object.entries(data).length == 0) {
          res.status(400).send({ status: false, msg: "kindly pass Some Data" })
       }
       let username = req.body.email;
       let password = req.body.password;

       if(!username){
         return res.status(400).send({status : false, msg : "Enter Valid Email"})}

       if(!password){
         return res.status(400).send({status:false,msg:"Enter valid Password"})}
         
       let user = await userModel.findOne({ email: username, password: password });
       if (!user)
          return res.status(400).send({
             status: false,
             msg: "username or password is not correct",
          });
       let token = jwt.sign({
          userId: user._id,
          email: username
       },
          "third project",
          {
            expiresIn:"30m"     // EXPIRY TIME FOR THE TOKEN
          }
       );
       res.setHeader("x-api-key", token);
       res.status(200).send({ status: true, data: token })
  
    }
    catch (err) {
       res.status(500).send({ status: false,Error: err.message })
    }
  }


  module.exports = {createUser,loginUser}
// module.exports.createUser=createUser

// module.exports.loginUser=loginUser