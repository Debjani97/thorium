const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')


 let authentication = async function(req, res, next){
    try{
        let token = req.headers['x-auth-token']
        if(!token) {
            return res.send({ msg: "token must be present" });
        }
        let decodedToken = jwt.verify(token, "functionup-thorium");
        // if (!decodedToken){
        //     return res.send({ status: false, msg: "token is invalid" });
        // }
        next()
    }catch(error){res.send({msg:"token is invalid"})}
}

let authorization = async function(req, res, next){
    let token = req.headers['x-auth-token']
    let decodedToken = jwt.verify(token, "functionup-thorium");
    console.log(decodedToken)
    let usedLoggedIn = decodedToken.userId
    let param_Id = req.params.userId
    console.log(param_Id)
    if (usedLoggedIn !== param_Id) return res.send("you are not autherised to access")
    next()
}

// module.exports.authenticate = authenticate
// module.exports.authorize = authorize

module.exports.authentication = authentication
module.exports.authorization = authorization