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

route.delete("/categories/:id", loginfunction, async (req, res) => {
    try {
        const { id } = req.params
        const deletetCategories = await categories.deleteOne({ _id: id })
        if (deletetCategories.deletedCount === 0) {
            return res.status(404).json({ message: "Categories not found" });
        }

        res.json({ message: "categories deleted successfully", deletetCategories });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete categories", error });
    }
})

module.exports = route