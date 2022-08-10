const mongoose = require("mongoose");

const MangasModel = mongoose.model(
    "mangasCatalog",
    {
        name: {
            type: String,
            required: false
        },
        synopsis: {
            type: String,
            required: false
        },
        genres: {
            type: Array,
            required: false
        },
        type_id: {
            type: Number,
            required: false
        },
        chapter_number: {
            type: Number,
            required: false
        },
        site_id: {
            type: Number,
            required: false
        },
        site_link: {
            type: String,
            required: false
        },
        cover_link: {
            type: String,
            required: false
        },
        last_update: {
            type: Date,
            default: Date.now
        }
    },
    "mangas"
);

module.exports = {MangasModel};