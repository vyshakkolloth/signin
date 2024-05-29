const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./route/userRoute");
const PORT = process.env.PORT || 3000;
const app = express();


require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose.connect("mongodb://127.0.0.1:27017/userdetail");
app.use("/",router)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
