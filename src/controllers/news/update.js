const News = require("../../models/news.schema");
const { isValidObjectId } = require("mongoose");

const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid news id" });
        }

        const updatedNews = await News.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({ message: "News updated successfully", updatedNews });
    } catch (error) {
        res.status(500).json({ message: "Failed to update news", error: error.message });
    }
};

const likeNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid news id" });
        }

        const updatedNews = await News.findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const dislikeNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid news id" });
        }

        const updatedNews = await News.findByIdAndUpdate(id, { $inc: { dislike: 1 } }, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const viewNews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid news id" });
        }

        const updatedNews = await News.findByIdAndUpdate(id, { $inc: { view: 1 } }, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { likeNews, dislikeNews, viewNews, updateNews };
