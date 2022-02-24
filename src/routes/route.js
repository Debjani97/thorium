const express = require('express');
const router = express.Router()

let persons= [
   {
   name: "PK",
   age: 10,
   votingStatus: false
},
{
   name: "SK",
   age: 20,
   votingStatus: false
},
{
   name: "AA",
   age: 70,
   votingStatus: false
},
{
   name: "SC",
   age: 5,
   votingStatus: false
},
{
   name: "HO",
   age: 40,
   votingStatus: false
},
]

router.post("/voters", function(req, res){
    const votingAge = req.query.votingAge
    console.log(req.query)
    const personVotingStatus = persons.filter(element => element.age > votingAge).map(element => ({...element, votingStatus : true}))
    console.log(personVotingStatus)
    res.send(personVotingStatus)

})
 
module.exports = router
