const { timeStamp } = require("console");
const mongoose = require("mongoose");

const accShema = new mongoose.Schema({
    appName:{
        type:String,
        required:[true,'username is must']
    },
    age:{
        type:String,
        required:[true,'username is must']
    },
    hobbies:{
        type:String,
        required:[true,'username is must']
    },
    qualification:{
        type:String,
        required:[true,'username is must']
    },
    
},{timestamps:true});


const Account = new mongoose.model('Account',accShema);

module.exports = Account;