const mongoose = require("mongoose");

const BotsModel = mongoose.model(
    "bots",
    {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        status: {
            type: Number,
            required: false
        },
        progress: {
            type: Number,
            required: false
        }
    },
    "bots"
);

module.exports = {BotsModel};