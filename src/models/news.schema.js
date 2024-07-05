const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        required: true,
        default: 0
    },
    dislike: {
        type: Number,
        required: true,
        default: 0
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
}, { timestamps: true });

module.exports = mongoose.model("News", NewsSchema);
