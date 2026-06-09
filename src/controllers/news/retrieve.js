const News = require("../../models/news.schema");
const { isValidObjectId } = require("mongoose");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const sortMap = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    most_viewed: { view: -1 },
    most_liked: { like: -1 }
};

const buildNewsFilter = (req) => {
    const filter = {};
    const search = req.query.search || req.query.title;

    if (search) {
        filter.$or = [
            { title: { $regex: new RegExp(search, "i") } },
            { description: { $regex: new RegExp(search, "i") } }
        ];
    }

    if (req.query.category_id) {
        filter.category_id = req.query.category_id;
    }

    return filter;
};

const sendPaginatedNews = async (req, res, filter = {}) => {
    const { page, limit, skip } = getPagination(req);
    const sort = sortMap[req.query.sort] || sortMap.newest;
    const [data, total] = await Promise.all([
        News.find(filter).populate("category_id").sort(sort).skip(skip).limit(limit),
        News.countDocuments(filter)
    ]);

    res.status(200).json({
        data,
        meta: getPaginationMeta({ page, limit, total })
    });
};

const getNewsPage = async (req, res) => {
    try {
        await sendPaginatedNews(req, res);
    } catch (error) {
        res.status(500).json({ message: "News not found", error: error.message });
    }
};

const getAllNews = async (req, res) => {
    try {
        const filter = buildNewsFilter(req);
        if (filter.category_id && !isValidObjectId(filter.category_id)) {
            return res.status(400).json({ message: "Invalid category id" });
        }

        await sendPaginatedNews(req, res, filter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "News not found", error: error.message });
    }
};

const searchNews = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: "Title parameter is required for search" });
        }

        await sendPaginatedNews(req, res, {
            title: { $regex: new RegExp(title, "i") }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to search news", error: error.message });
    }
};

const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid news id" });
        }

        const news = await News.findById(id).populate("category_id");
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve news", error: error.message });
    }
};

const getNewsByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid category id" });
        }

        await sendPaginatedNews(req, res, { category_id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch news by category", error: error.message });
    }
};

const getMostViewedNews = async (req, res) => {
    try {
        const { limit } = getPagination(req);
        const data = await News.find().populate("category_id").sort({ view: -1 }).limit(limit);
        res.status(200).json({ data, meta: { limit } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getNewsPage, getAllNews, searchNews, getNewsById, getNewsByCategory, getMostViewedNews
};
