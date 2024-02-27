const mongoose = require("mongoose");


//creating User Schema
const todoSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
);
//creating User model
Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;