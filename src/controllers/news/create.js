const News = require("../../models/news.schema");
const loginfunction = require("../../midleweare/login");

const createNews = async (req, res) => {
    try {
        const news_req = req.body;
        const newNews = new News(news_req);
        await newNews.save();
        res.status(201).json({ message: "News created successfully", newNews });
    } catch (error) {
        res.status(500).json({ message: "Failed to create news", error });
    }
};

module.exports = { createNews };
