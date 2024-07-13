const News = require("../../models/news.schema");


const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNews = await News.deleteOne({ _id: id });

        if (deletedNews.deletedCount === 0) {
            return res.status(404).json({ message: "News not found" });
        }

        res.json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete news", error });
    }
};

module.exports = { deleteNews };
