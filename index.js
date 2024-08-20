require("dotenv").config()
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3000;
//routers
const categorieRoute = require("./src/routes/categories");
const newsRoute = require("./src/routes/news");
const loginRoute = require("./src/routes/login");
const { upload, deleteImage } = require("./src/midleweare/upload");
const loginfunction = require("./src/midleweare/login");
app.use(express.json())
app.use(cors())

async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("qosuldu");
    } catch (error) {
        console.log("qosulmadi", error);
    }
}
connect()
app.use("/", loginRoute)
app.use("/", categorieRoute)
app.use("/", newsRoute)
app.post("/img", upload.single("img"), (req, res) => {
    res.send({ img_url: req.file.location });
})
app.delete("/img/:filename", loginfunction, deleteImage)
app.get("/verify", loginfunction, (req, res) => res.status(200).json({ status: true }))
app.listen(port, () => {
    connect()
    console.log(port);
})
