const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is must']
    },
    email:{
        type:String,
        unique:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Email is invalid..")
            }
        },
        required:[true,'email is must'],
        
    },
    password:{
        type:String,
        required:[true,'password is must']
    },
    avatarCode:{
        type:String,
        required:[true,'avatar is must']
    }
},{timestamps:true});


const User = new mongoose.model('User',userSchema);

module.exports = User;  