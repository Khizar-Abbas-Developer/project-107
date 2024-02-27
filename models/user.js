const mongoose = require("mongoose");


//creating User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: ""
    },
    items: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
);
//creating User model
User = mongoose.model('User', userSchema);
module.exports = User