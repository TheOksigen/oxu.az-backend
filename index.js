const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
//routers
const categorieRoute = require("./src/routes/categories");
const newsRoute = require("./src/routes/news");
const loginRoute = require("./src/routes/login");

require("dotenv").config()
app.use(express.json())
const port = process.env.PORT || 3000;
async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("qosuldu");
    } catch (error) {
        console.log("qosulmadi", error);
    }
}

app.use("/", loginRoute)
app.use("/", categorieRoute)
app.use("/", newsRoute)

app.listen(port, () => {
    connect()
    console.log(port);
})