const express = require('express');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://kfarzan13:Farzankh13@demodb.dclp2mx.mongodb.net/AssignmentCapCoin-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
