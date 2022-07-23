const mongoose = require("mongoose");

const MangasListsModel = mongoose.model(
    "mangasLists",
    {
        user_id: {
            type: String,
            required: true
        },
        manga_id: {
            type: String,
            required: true
        },
        manga_name: {
            type: String,
            required: true
        },
        current_chapter_link: {
            type: String,
            required: false
        },
        current_chapter: {
            type: Number,
            required: false
        },
        is_read: {
            type: Boolean,
            required: false
        },
        status_id: {
            type: Number,
            required: false
        },
        last_update: {
            type: Date,
            default: Date.now
        }
    },
    "mangas_list"
);

module.exports = {MangasListsModel};