const mongoose = require("mongoose");
const URL = process.env.URM
mongoose.connect(URL).then(()=>{
    console.log("Connected to Database!");
}).catch((error)=>{
    console.log("Can't connect to database!");
    console.log(error);
})