const { default: mongoose } = require("mongoose");


const newsSchame = mongoose.Schema({
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
        required: true,        
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
        ref: "categories"
    }

}, { timestamps: true })


module.exports = mongoose.model("news", newsSchame)