const express = require("express");
const router = express.Router()
const News = require("../models/news.schema");
const loginfunction = require("../midleweare/login");

router.post("/news", loginfunction, async (req, res) => {
    try {
        const news_req = req.body;
        const newNews = new News(news_req)
        await newNews.save()
        res.status(201).json({ message: "News Created has succses", newNews })
    } catch (error) {
        res.status(500).json({ message: "News Created has not succses", error })
    }
});
router.get("/news/:page", async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const newNews = await News.find().populate("category").skip(skip).limit(perPage);
        res.status(201).json(newNews)
    } catch (error) {
        res.status(500).json({ message: "News not found", error })
    }
});
router.get("/news/:id", async (req, res) => {
    try {
        const { id } = req.params
        const news = News.find({ _id: id }).populate("category")
        res.status(200).json(news)
    } catch (error) {
        res.send(404).json({ message: "news its not available", error })
    }
});
router.patch("/news_like/:id", loginfunction, async (req, res) => {
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
});
router.patch("/news_dislike/:id", loginfunction, async (req, res) => {
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
})
router.delete("/news/:id", loginfunction,  async (req, res) => {
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
});
router.get("news_by_categ/:id", (req, res) => {
    try {
        const { id } = req.params
        const categNews = News.find({ category: id })
        res.status(200).json(categNews)
    } catch (error) {

    }
})

module.exports = router;
