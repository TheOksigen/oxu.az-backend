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
// connect()
app.listen(port, () => {
    connect()
    console.log(port);
})
