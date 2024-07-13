const Category = require("../../models/categories.schema");

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.deleteOne({ _id: id });
        if (deletedCategory.deletedCount === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        res.status500().json({ message: "Failed to delete category", error });
    }
};

module.exports = { deleteCategory };
