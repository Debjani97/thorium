const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const authentication =async function(req, res, next) {
  try{
    //check the token in request header
    //validate this token
          let token = req.headers["x-auth-token"];
        //   if (!token) token = req.headers["x-auth-token"];
          if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
      
          let decodedToken = jwt.verify(token, "functionup-thorium");
        //   console.log(decodedToken)
          if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });
          next()
      }catch (err) {
        console.log("This is the error", err.message)
        res.status(500).send({ msg: "Error", error:"arnabbiswas" });
      }
    };




const authorization = async function(req, res, next) {
  try{
    // comapre the logged in user's id and the id in request
        let userToBeModified = req.params.userId
        let token = req.headers["x-auth-token"]
        let decodedToken = jwt.verify(token, "functionup-thorium")
        let userLoggedIn = decodedToken.userId
        if (userToBeModified != userLoggedIn) return res.status(400).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
        next()
      }catch (err) {
        console.log("This is the error", err.message)
        res.status(500).send({ msg: "Error", error:"arnabbiswas" });
      }
    };

module.exports.authentication = authentication
module.exports.authorization = authorization