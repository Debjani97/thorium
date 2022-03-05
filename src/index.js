const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    function(req, res, next) {
        let currentData = new Date()
        let Ip = req.socket.remoteAddress
        console.log(currentData,Ip,req.originalUrl)
        next()
        }
)


mongoose.connect("mongodb+srv://debjani97:debjani97@cluster0.mxihy.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-12zga8-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});