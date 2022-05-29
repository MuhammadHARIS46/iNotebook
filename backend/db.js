const mongoose = require("mongoose");
const nodemon = require("nodemon");
const MongoURI="mongodb://localhost:27017/iNotebook";
const connectToMongo=()=>{
    mongoose.connect(MongoURI,()=>{
        console.log("Hogya connect")
    })
}
module.exports =connectToMongo;