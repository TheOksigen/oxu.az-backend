const express = require("express");
const route = express.Router()
const News = require("../models/news.schema");
const loginfunction = require("../midleweare/login");

route.post("/news", loginfunction, async (req, res) => {
    try {
        const news_req = req.body;
        const newNews = new News(news_req)
        await newNews.save()
        res.status(201).json({ message: "News Created has succses", newNews })
    } catch (error) {
        res.status(500).json({ message: "News Created has not succses", error })
    }
}); // succses

route.get("/news_page/:page", async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const newNews = await News.find().populate("category_id").skip(skip).limit(perPage);
        res.status(201).json(newNews)
    } catch (error) {
        res.status(500).json({ message: "News not found", error })
    }
}); // succses

route.get("/news", async (req, res) => {
    try {
        const newNews = await News.find().populate("category_id");
        res.status(200).json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "News not found", error });
    }
}); // succses

route.get("/news/search", async (req, res) => {
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
});  // succses

route.get("/news/:id", async (req, res) => {
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
}); // succses

route.patch("/news_like/:id", async (req, res) => {
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
});  // succses

route.patch("/news_dislike/:id", async (req, res) => {
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
})  // succses

route.patch("/news_view/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedNews = await News.findByIdAndUpdate(id, { $inc: { view: 1 } }, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "news not found" })
        }
        res.status(201).json(updatedNews)
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}) // succses

route.delete("/news/:id", loginfunction, async (req, res) => {
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
}); // succses

route.get("/news_by_categ/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const categNews = await News.find({ category_id: id }).populate("category_id");

        res.status(200).json(categNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch news by category", error });
    }
}); // succses

route.get("/news_viewed", async (req, res) => {
    try {
        const mostViewedNews = await News.find().sort({ view: -1 }).limit(10);
        res.json(mostViewedNews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = route;