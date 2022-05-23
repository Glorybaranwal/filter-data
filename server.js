const express = require('express');
const PORT = 8000;
const app = express();
const mongoClient = require("mongodb").MongoClient
const path = require("path");


const mongoUrl = "mongodb://localhost:27017/"
global.db = ""
mongoClient.connect(mongoUrl, {useUnifiedTopology: true},(err, res)=> {
    if(err){console.log("not connected db"); return}
    db = res.db("tabdata")
    console.log("connected db");
} )


//const rPostUsers = require(__dirname+"/routes/post-users.js")
const rPostUsers = require(path.join(__dirname,"routes","filters","post-users.js"))
app.post("/", rPostUsers)




app.listen(PORT, err => {
    if (err) {console.log("server error"); return}
    console.log("server listening")
})

