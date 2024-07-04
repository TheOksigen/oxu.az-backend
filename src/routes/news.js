const express = require("express")
const route = express.Router()
const news = require("../models/news.schema")
const loginfunction = require("../midleweare/login")

route.post("/news", loginfunction, async (req, res) => {
    console.log(req.body);
    try {
        const newnews = new news(req.body)
        await newnews.save()
        res.status(201).json({ message: "categorie created", newnews })
    } catch (error) {
        res.status(500).json({ message: "categorie not created", error })
    }
})


route.post("/news_like/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const newsItem = await News.findById(id);

        if (!newsItem) {
            return res.status(404).json({ message: "News article not found" });
        }

        // Increment the likes count
        newsItem.likes += 1;
        await newsItem.save();

        res.status(200).json({ message: "News article liked", newsItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to like news article", error });
    }
});

route.post("/news_dislike/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const newsItem = await News.findById(id);

        if (!newsItem) {
            return res.status(404).json({ message: "News article not found" });     }

        
        newsItem.dislikes += 1;
        await newsItem.save();

        res.status(200).json({ message: "News article disliked", newsItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to dislike news article", error });
    }
});

route.get("/news", async (req, res) => {
    try {
        const allnews = await news.find().populate("category_id")
        res.status(200).json(allnews)
    } catch (error) {
        res.status(500).json({ message: "categorie not created", error })
    }
})

module.exports = route