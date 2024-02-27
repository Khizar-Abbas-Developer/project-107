const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require("body-parser");
const express = require("express");
const router = require("./routes/routes");
const app = express();
const cors = require("cors");
require("./mongodb/db");

//middlewares
app.use(bodyparser.urlencoded({extended: false}))
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(router)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} successfully`);
})