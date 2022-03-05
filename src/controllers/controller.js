const firstTest = async function (req, res){
    let data = req.body
    console.log(data)
    res.send({msg: " firstTest is working fine"})

}

const secondTest = async function (req, res){

    res.send({msg: " secondTest is working fine"})

}
const thirdTest = async function (req, res){

    res.send({msg: " thirdTest is working fine"})

}
const fourthTest = async function (req, res){

    res.send({msg: " fourthTest is working fine"})

}

module.exports.firstTest = firstTest
module.exports.secondTest = secondTest
module.exports.thirdTest = thirdTest
module.exports.fourthTest = fourthTest