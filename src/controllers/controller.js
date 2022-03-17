// let axios = require("axios");
const AuthorModel = require("../models/AuthorModel.js");
const blogsmodel = require("../models/BlogsModel.js");
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
  try {
    let data = req.body;
    let authorId = data.authorId
    const author_details = await AuthorModel.findById(authorId)
    if (!author_details) {
      res.status(400).send("Invalid");
    }
    req.body.isPublished = true;
    if (Object.keys(data).length != 0) {
      let savedData = await blogsmodel.create(data)
      res.status(201).send({ msg: savedData });
    }
    else {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
  } catch (err) {
    res.status(500).send({ status: false, Error: err });
  }
}

const getBlog = async function (req, res) {
  try {
    const a_id = req.query.authorId
    const authorDetails = await AuthorModel.findById({ _id: a_id })
    if (!authorDetails) res.status(400).send({ msg: "author not found" })
    const c_details = req.query.category
    const tags = req.query.tags
    const subtag = req.query.subcategory
    let findBlog = await blogsmodel.find(
      {isDeleted:false, isPublished:true, $or:[{authorId:a_id},{category:c_details},{tags:tags},{subcategory:subtag}]}

    )
    if (!findBlog) res.status(404).send({ status: false, msg: "not found" })
    res.status(200).send({ status: true, msg: findBlog });
  } catch (err) {
    res.status(500).send({ status: false, Error: err });
  }
}


const updateBlog = async function (req, res) {
  try {
    let id = req.params.blogId;
    let data = req.body;
    const updateData = await blogsmodel.findById(id)
    if (updateData.isDeleted==true) {
      res.status(404).send({ status: false, msg:err.message})
    }
    data.publishedAt = new Date();
    data.isPublished = true;
    const dataMore = await blogsmodel.findByIdAndUpdate(id, data, { new: true });
    res.status(201).send({ status: true, msg: dataMore })
  } catch (err) {
    res.status(500).send({ status: false, Error:err });
  }
}


const deleteById = async function (req, res) {
  try {
    let blogId = req.params.blogId
    if (!blogId) {
      res.status(400).send({ status: false, msg: "blogId is required, BAD REQUEST" })
    }
    let blogDetails = await blogsmodel.findOne({ _id: blogId }, { isDeleted: false })
    if (!blogDetails) {
      res.status(404).send({ status: false, msg: "blog not exist" })
    } else {
      let blogDetails = await blogsmodel.updateOne({ _id: blogId }, { $set: { isDeleted: true,deletedAt :Date.now } }, { new: true })
      res.status(201).send({msg:"delected blog"})
      console.log(blogDetails)
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
}


const deleteByQuery = async function (req, res) {
  try {
    let authorIds = req.query.authorId
    let categorys = req.query.category
    let tag = req.query.tags
    let subcategorys = req.query.subcategory
    if (!authorIds && !categorys && !tag && !subcategorys) {
      res.status(400).send({ status: false, msg: "quarys is required, BAD REQUEST" })
    }
    let authorDetails = await AuthorModel.findById({ _id: authorIds })
    if (!authorDetails) {
      res.status(404).send({ status: false, msg: "authorId not exist" })
    } else {
      let updatedDetails = await blogsmodel.findOneAndUpdate({$or: [ { authodId: authorIds },{ category: categorys }, { tags: { $in: [tag] } }, { subcategory: { $in: [subcategorys]}}]},{ isDeleted: true})
      res.status(201).send({msg:"blog deleted "})
      req.body.deletedAt = new Date()
      console.log(updatedDetails)
    }

  }
  catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message })
  }
}


// const loginUser = async function (req, res) {
//   try{
//   let data = req.body;
//   if(Object.entries(data).length == 0){
//     res.status(400).send({ status: false, msg: "kindly pass same data"})
//   }
//   let userName = req.body.email;
//   let password = req.body.password;

//   let user = await AuthorModel.findOne({ email: userName, password: password });
//   if (!userName)
//     return res.status(400).send({
//       status: false,
//       msg: "username or the password is not correct",
//     });

//     let token = jwt.sign(
//   {
//       auhor_Id: user._id.toString(),
//       batch: "functionup",
//       organisation: "thorium",
//   },
//     "first project"
//   );
//   res.setHeader("x-api-key", token);
//   res.status(200).send({ status: true, data: token });
//   }
//   catch(err){
//       res.status(500).send({Error:err.messages})
//   }
// }

const loginUser = async function (req, res) {
  try {
     let data = req.body;
     if (Object.entries(data).length == 0) {
        res.status(400).send({ status: false, msg: "kindly pass Some Data" })
     }
     let username = req.body.email;
     let password = req.body.password;
     let user = await AuthorModel.findOne({ email: username, password: password });
     if (!user)
        return res.status(400).send({
           status: false,
           msg: "username or password is not correct",
        });
     let token = jwt.sign({
        userId: user._id,
        email: username
     },
        "first project"
     );
     res.setHeader("x-api-key", token);
     res.status(200).send({ status: true, data: token })

  }
  catch (err) {
     res.status(500).send({ Error: err.message })
  }
}




module.exports.createAuthor=createAuthor
module.exports.createBlog=createBlog
module.exports.getBlog=getBlog
module.exports.updateBlog=updateBlog
module.exports.deleteById=deleteById
module.exports.deleteByQuery=deleteByQuery
module.exports.loginUser=loginUser
