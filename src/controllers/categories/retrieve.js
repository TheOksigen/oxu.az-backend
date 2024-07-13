const Category = require("../../models/categories.schema");

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find();
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json({ message: "Categories not found", error });
    }
};

module.exports = { getAllCategories };
