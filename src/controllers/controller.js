// let axios = require("axios");
const AuthorModel = require("../models/AuthorModel.js");
const blogsmodel = require("../models/BlogsModel.js")
// const emailValidator =require("validator");
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {
    try{
       let data = req.body;
       if(Object.keys(data).length != 0){
       let savedData = await AuthorModel.create(data);
       res.status(201).send({ msg: savedData });
     }
     else res.status(400).send({msg:"bad request"})
    }
    catch(err){
       console.log("this is the error:",err.message)
        res.status(500).send({msg:"Error",error:err.message})
     }
  };


const createBlog = async function (req, res) {
    try{
               let blog = req.body
               let authorId = req.body.authorId
               let author = await AuthorModel.findById(authorId)
               if(!author)
               {
                  res.status(400).send({status : false, msg:"No Such Author is Present,Please check authorId"})
               }
               let blogCreated = await blogsmodel.create(blog)
               res.status(201).send({status:true,data: blogCreated})
         }
     catch(error)
          {
                console.log(error)
                res.status(500).send({status : false, msg : error.message})
          }  
 };


 const getBlog = async function(req, res){
  try{
      let query = req.query
      let filter ={
          isdeleted : false,
          ispublished : false,
          ...query
      };
      let filterByquery = await blogsmodel.find(filter)
      if(filterByquery.length == 0){
          return res.status(400).send({msg:"Blog Not Found"})
      }
      else{
          return res.status(200).send({msg:filterByquery})
      }
  }catch(err){
      res.status(500).send({statue:false , msg:err.message})
  }
}


const updateBlog = async function(req,res){
    try{
    let updateblog = req.params.blogId
    let  = await blogsmodel.findById(updateblog)
  if (!updateblog) {
    return res.status(404).send({msg:"Invalid Blog"})
  }
  let updatedata = req.body;
  let updatedUser = await blogsmodel.findOneAndUpdate({ _id: updateblog },{title : updatedata.title, body:updatedata.body, tags : updatedata.tags},{new : true, upsert : true});
  res.status(200).send({ status: true, data: updatedUser })
}catch(err){
    res.status(500).send({Error : err.message})
    }
};

const deleteById = async function(req,res){
  try{
  let deleteblog = req.params.blogId;
  let = await blogsmodel.findById(deleteblog)
  if (!deleteblog) {
    return res.status(404).send({ msg: "Is not deleted" });
  }
  let blogId = req.params.blogId;
  let userDel = await blogsmodel.findOneAndUpdate({_id: blogId},{isDeleted: true},{new:true});
  res.status(200).send({status:true, data:userDel})
  }catch(err){
    res.status(500).send({Error : err.message})
  }
};


 const deleteByQuery = async function(req,res){
  try{  
          let query = req.query
          let filter = {...query}
          let filterByquery = await blogsmodel.find(filter)
          if(filterByquery.length == 0){
              return res.status(400).send({msg:"Blog Not Found"})
          }
          else{
              let deletedDetails = await blogsmodel.findOneAndUpdate({filter}, {isDeleted : true}, {new : true})
              return res.status(200).send({msg:deletedDetails})
          }
  }catch(err){
      res.status(500).send({Error : err.message})
  }
} 


// const loginUser = async function(req,res){
//   try{
//        let data =req.body;
//        if(Object.entries(data).length===0){
//            res.status(400).send({status:false,msg:"kindly pass Some Data"})
//        }
//        let username = req.body.email;
//        let password = req.body.password;
//        let user = await AuthorModel.findOne({email:username,password:password})
//        if(!user){
//            return req.status(400).send({status : false,msg:"username and password are not matching"})
//        }
//        let token = jwt.sign({
//             userId: user._id.toString(),
//             batch: "thorium",
//           },"project_1")
//           res.setHeader('x-api-key',token);
//         res.status(200).send({status:true,data:token})
//   }
//   catch (error) {
//       return response.status(500).send({Error: error.message});

//   }
// }

const loginUser = async function (req, res) {
  try{
  let userName = req.body.email;
  let password = req.body.password;

  let user = await AuthorModel.findOne({ email: userName, password: password });
  if (!userName)
    return res.send({
      status: false,
      msg: "username or the password is not correct",
    });

    let token = jwt.sign(
  {
      auhor_Id: user._id.toString(),
      batch: "functionup",
      organisation: "thorium",
  },
    "first project"
  );
  res.setHeader("x-api-key", token);
  res.status(200).send({ status: true, data: token });
  }
  catch(err){
      res.status(500).send({Error:err.messages})
  }
}



module.exports.createAuthor=createAuthor
module.exports.createBlog=createBlog
module.exports.getBlog=getBlog
module.exports.updateBlog=updateBlog
module.exports.deleteById=deleteById
module.exports.deleteByQuery=deleteByQuery
module.exports.loginUser=loginUser

