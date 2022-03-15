const jwt = require("jsonwebtoken");
const AuthorModel = require("../models/AuthorModel.js");
const blogsmodel = require("../models/BlogsModel.js");

const authenticate = function(req, res, next){
    try{
    let token = req.headers['x-api-key']
    if(!token) return res.status(400).send({msg:"Token is required"})
    let decodedToken = jwt.verify(token, "first project")     
    if(!decodedToken) return res.send({ status: false, msg: "token is invalid"})
    next()
}catch(err){
    res.status(500).send({Error:err.message})
}
}

const authorize = function(req, res, next){
    try{
    let token = req.headers['x-api-key']
    let decodedToken = jwt.verify(token, "first project",)
    let userToBeModified = req.params.author_Id
    let userLoggedIn = decodedToken.author_Id
    if(userToBeModified !== userLoggedIn) return res.status(400).send({status: false, msg:"User is not allowed for logged in"})
    next()
}catch(err){
    res.status(500).send({Error: err.message})
}
}

module.exports.authenticate=authenticate
module.exports.authorize=authorize

// const jwt = require("jsonwebtoken")
// const authentication = function(req,res,next){
//     try{
//         let token = req.headers["x-api-key"]
//         if(!token)
//         return res.status(401).send({status: false, msg:"Token not present"})
    
//         let decodedToken = jwt.verify(token,"Project_1")
//         if(!decodedToken)
//         return res.status(401).send({status:false,msg:"Token is invalid"})
//     next()
//     }
//     catch(error)
//     {
//         res.status(500).send({status : false,msg : error.message})
//     }
// }
// const authorization = function(req, res, next) {
    
//     try{
//         let token = req.headers["x-api-key"]
//         if(!token)
//         return res.status(401).send({status: false, msg:"Token not present"})
    
//         let decodedToken = jwt.verify(token,"Project_1")
//         if(!decodedToken)
//         return res.status(401).send({status:false,msg:"Token is invalid"})
    
//         let userId = req.query.authorId
//         let userLoggedIn = decodedToken.userId
    
//         if(userId !== userLoggedIn ){
//             res.status(403).send({status : false, msg : "User is not Allowed to modify the request"})
//         } next()
//     }
//         catch(error)
//         {
//             res.status(500).send({status: false ,msg : error.message})
//         }

    
// }


//     module.exports.authorization=authorization
//     module.exports.authentication=authentication