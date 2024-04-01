const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Enter user name"],
    },
    email : {
        type : String,
        required : [true, "Enter Email"],
        unique : [true, "Email already registered"]
    },
    password : {
        type : String,
        required : [true, "Enter password"],
    },
},
    {
        timestamps : true,
    }    
)

module.exports = mongoose.model("users", userSchema);