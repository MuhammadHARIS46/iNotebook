const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required :true, // ye to chahiye hi chahiye
    },
    email:{
        type:String,
        required:true,
        unique:true // mtlb email sbka alg hoga
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
 
  });
module.exports=mongoose.model('user',UserSchema);
  