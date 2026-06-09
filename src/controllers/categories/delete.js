const Category = require("../../models/categories.schema");
const { isValidObjectId } = require("mongoose");

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid category id" });
        }

        const deletedCategory = await Category.deleteOne({ _id: id });
        if (deletedCategory.deletedCount === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category", error: error.message });
    }
};

module.exports = { deleteCategory };
