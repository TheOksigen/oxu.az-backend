const News = require("../../models/news.schema");
const { isValidObjectId } = require("mongoose");


const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid news id" });
        }

        const deletedNews = await News.deleteOne({ _id: id });

        if (deletedNews.deletedCount === 0) {
            return res.status(404).json({ message: "News not found" });
        }

        res.json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete news", error: error.message });
    }
};

module.exports = { deleteNews };
