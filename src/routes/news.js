const express = require("express");
const router = express.Router();
const { createNews } = require("../controllers/news/create");
const { getNewsPage, getAllNews, searchNews, getNewsById, getNewsByCategory, getMostViewedNews } = require("../controllers/news/retrieve");
const { likeNews, dislikeNews, viewNews, updateNews } = require("../controllers/news/update");
const { deleteNews } = require("../controllers/news/delete");
const loginfunction = require("../midleweare/login");

router.post("/news", loginfunction, createNews);

router.get("/news_page/:page", getNewsPage);
router.get("/news", getAllNews);
router.get("/news/search", searchNews);
router.patch("/news/:id", loginfunction, updateNews);
router.get("/news/:id", getNewsById);
router.get("/news_by_categ/:id", getNewsByCategory);
router.get("/news_viewed", getMostViewedNews);

router.patch("/news_like/:id", likeNews);
router.patch("/news_dislike/:id", dislikeNews);
router.patch("/news_view/:id", viewNews);

router.delete("/news/:id", deleteNews);

module.exports = router;
