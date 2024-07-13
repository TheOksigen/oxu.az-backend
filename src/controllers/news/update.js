const News = require("../../models/news.schema");

const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNews = await News.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({ message: "News updated successfully", updatedNews });
    } catch (error) {
        res.status(500).json({ message: "Failed to update news", error });
    }
};

const likeNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNews = await News.findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(201).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const dislikeNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNews = await News.findByIdAndUpdate(id, { $inc: { dislike: 1 } }, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(201).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const viewNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNews = await News.findByIdAndUpdate(id, { $inc: { view: 1 } }, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(201).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { likeNews, dislikeNews, viewNews, updateNews };
