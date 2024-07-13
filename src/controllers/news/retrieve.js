const News = require("../../models/news.schema");

const getNewsPage = async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const newNews = await News.find().populate("category_id").skip(skip).limit(perPage);
        res.status(200).json(newNews);
    } catch (error) {
        res.status(500).json({ message: "News not found", error });
    }
};

const getAllNews = async (req, res) => {
    try {
        const newNews = await News.find().populate("category_id");
        res.status(200).json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "News not found", error });
    }
};

const searchNews = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: "Title parameter is required for search" });
        }
        const news = await News.find({ title: { $regex: new RegExp(title, "i") } }).populate("category_id");
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Failed to search news", error });
    }
};

const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id).populate("category_id");
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve news", error });
    }
};

const getNewsByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categNews = await News.find({ category_id: id }).populate("category_id");
        res.status(200).json(categNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch news by category", error });
    }
};

const getMostViewedNews = async (req, res) => {
    try {
        const mostViewedNews = await News.find().sort({ view: -1 }).limit(10);
        res.json(mostViewedNews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getNewsPage, getAllNews, searchNews, getNewsById, getNewsByCategory, getMostViewedNews
};
