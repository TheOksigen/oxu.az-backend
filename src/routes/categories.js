const express = require("express")
const route = express.Router()
const categories = require("../models/categories.schema")
const loginfunction = require("../midleweare/login")

route.post("/categories", loginfunction, async (req, res) => {
    try {
        const newcategories = new categories(req.body)
        await newcategories.save()
        res.status(201).json({ message: "categorie created", newcategories })
    } catch (error) {
        res.status(500).json({ message: "categorie not created", error })
    }
})

route.get("/categories", async (req, res) => {
    try {
        const allcategories = await categories.find()
        res.status(200).json(allcategories)
    } catch (error) {
        res.status(500).json({ message: "categorie not created", error })
    }
})

module.exports = route