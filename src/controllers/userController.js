const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const isValid = function (value) {
   if (typeof value == 'undefined' || value === null) return false
   if (typeof value == 'string' && value.trim().length === 0) return false
   return true
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0; // it checks, is there any key is available or not in request body
};

const isValidTitle = function(title) {
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
}

//................................post_api_creatuser......................................\\

const createUser = async function (req, res) {
    try{
      const requestBody = req.body;
      const { title, name, phone, email, password, address } = requestBody;    //Object destructuring

      //Validation starts
      if (!isValidRequestBody(requestBody)) { //to check the empty request body
          return res.status(400).send({ status: false, message: "Invalid request parameters,Empty body not accepted." })
      };
      if (!isValid(title)) {
          return res.status(400).send({ status: false, message: "Title must be present" })
      };
     if (!isValidTitle(title)) {
          return res.status(400).send({ status: false, message: `Title should be among Mr, Mrs or Miss` })
      };
      if (!isValid(name)) {
          return res.status(400).send({ status: false, message: "Name is required." })
      };
      if (!isValid(phone)) {
          return res.status(400).send({ status: false, message: "Phone number is required" })
      };
      if (!isValid(email)) {
          return res.status(400).send({ status: false, message: "Email id is required" })
      };
      if (!isValid(password)) {
          return res.status(400).send({ status: false, message: "password is required" })
      };
      if (!isValid(address)) {
          return res.status(400).send({ status: false, message: "Address cannot be empty if key is mentioned." })
      };
      //validation end.

      //searching phone in DB to maintain uniqueness.
      const verifyPhone = await userModel.findOne({ phone: phone })
      if (verifyPhone) {
          return res.status(400).send({ status: false, message: "Phone number already used" })
      }

      //searching email in DB to maintain uniqueness.
      const verifyEmail = await userModel.findOne({ email: email })
      if (verifyEmail) {
          return res.status(400).send({ status: false, message: "Email id is already used" })
      }

      //validating phone number of 10 digits only.
      if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone))
          return res.status(400).send({ status: false, message: "Invalid Phone number.Phone number must be of 10 digits." })

      //validating email using RegEx.
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
          return res.status(400).send({ status: false, message: "Invalid Email id." })

      //setting password's mandatory length in between 8 to 15 characters.
      if (!(password.length >= 8 && password.length <= 15)) {
          return res.status(400).send({ status: false, message: "Password criteria not fulfilled; Minimum length-8 & Maximum length-15." })
      }

      //saving user's data into DB.
      const userData = await userModel.create(requestBody)
      return res.status(201).send({ status: true, message: "Successfully saved User data", data: userData })

}
catch (error) {
res.status(500).send({ status: false, msg: error.message })
}
};

//................................post_api_loginuser......................................\\
  
const loginUser = async function (req, res) {
    try {
       let data = req.body;
       if (Object.entries(data).length == 0) {
          res.status(400).send({ status: false, msg: "kindly pass Some Data" })
       }
       let email = req.body.email;
       let password = req.body.password;


       if(!email){
         return res.status(400).send({status : false, msg : "Email-id require"})}

       if(!password){
         return res.status(400).send({status:false,msg:"Password require"})}
       
         
       let user = await userModel.findOne({ email: email });
       if (!user)
          return res.status(400).send({
             status: false,
             msg: "email is not correct",
          }); 

      let user1 = await userModel.findOne({ password: password });
      if (!user1)
         return res.status(400).send({
            status: false,
            msg: "password is not correct",
          });

       let token = jwt.sign({
          userId: user._id,
          email: email,
        //   iat: Math.floor(Date.now() / 1000),
        //   exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
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
